(function () {
  "use strict";

  var KEY = "japanisch-trainer-v1";
  var JP = /[぀-ヿ㐀-鿿]/;
  var BLANK = /(（[　 ]*）)/;
  var $ = function (id) { return document.getElementById(id); };

  var S = null;
  var storageOK = true;
  var view = "vocab";

  /* ---------- Hilfen ---------- */
  function uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function richText(node, s) {
    node.textContent = "";
    var parts = String(s).split(/\*\*(.+?)\*\*/);
    parts.forEach(function (p, i) {
      if (i % 2) { node.appendChild(el("b", null, p)); }
      else if (p) { node.appendChild(document.createTextNode(p)); }
    });
  }
  function norm(s) { return (s || "").replace(/[\s　。、．，.,!！?？「」]/g, ""); }
  function toggleIn(list, value) {
    var i = list.indexOf(value);
    var out = list.slice();
    if (i >= 0) out.splice(i, 1); else out.push(value);
    return out;
  }

  /* ---------- Daten ---------- */
  function seed() {
    var D = window.DEFAULT_DATA;
    return {
      decks: D.decks.map(function (d) {
        return { id: d.id, name: d.name, cards: d.cards.map(function (c, i) { return { id: d.id + "-" + i, a: c[0], b: c[1] }; }) };
      }),
      patterns: JSON.parse(JSON.stringify(D.patterns)),
      grammar: D.grammar.map(function (g, i) { return { id: "g-" + i, p: g.p, q: g.q, a: g.a, alt: g.alt || [], n: g.n || "" }; }),
      mc: (D.mc || []).map(function (m, i) { return { id: "m-" + i, p: m.p, q: m.q, o: m.o, n: m.n || "" }; }),
      vknown: {},
      gdone: {},
      set: { dir: "a", gmode: "mc", selDecks: [], selPatterns: [] }
    };
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.decks && s.grammar) {
        var D = seed();
        s.patterns = s.patterns || {};
        Object.keys(D.patterns).forEach(function (k) { if (!s.patterns[k]) s.patterns[k] = D.patterns[k]; });
        s.mc = s.mc || D.mc;
        s.vknown = s.vknown || {};
        s.gdone = s.gdone || {};
        s.set = s.set || {};
        s.set.dir = s.set.dir || "a";
        s.set.gmode = s.set.gmode || "mc";
        s.set.selDecks = s.set.selDecks || [];
        s.set.selPatterns = s.set.selPatterns || [];
        return s;
      }
    } catch (e) {}
    return seed();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOK = true; }
    catch (e) { storageOK = false; $("storage-warn").hidden = false; }
  }

  /* ---------- CSV ---------- */
  function countOutside(line, d) {
    var n = 0, q = false;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (c === '"') q = !q;
      else if (c === d && !q) n++;
    }
    return n;
  }
  function detectDelim(text) {
    var lines = text.replace(/\r\n?/g, "\n").split("\n").filter(function (l) { return l.trim() !== ""; });
    var cands = ["\t", ";", ","];
    var best = ",", bestTotal = -1;
    for (var k = 0; k < cands.length; k++) {
      var d = cands[k];
      var counts = lines.map(function (l) { return countOutside(l, d); });
      var same = counts.length > 0 && counts[0] > 0 && counts.every(function (c) { return c === counts[0]; });
      if (same) return d;
      var total = counts.reduce(function (a, b) { return a + b; }, 0);
      if (total > bestTotal) { bestTotal = total; best = d; }
    }
    return best;
  }
  function parseCSV(text, delim) {
    text = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
    var rows = [], row = [], f = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else { q = false; } }
        else f += c;
      } else if (c === '"' && f === "") { q = true; }
      else if (c === delim) { row.push(f); f = ""; }
      else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f !== "" || row.length) { row.push(f); rows.push(row); }
    return rows
      .map(function (r) { return r.map(function (x) { return x.trim(); }); })
      .filter(function (r) { return r.some(function (x) { return x !== ""; }); });
  }
  function readInput(textId, delimId) {
    var text = $(textId).value;
    if (!text.trim()) return { rows: [], delim: "," };
    var sel = $(delimId).value;
    var d = sel === "auto" ? detectDelim(text) : { tab: "\t", comma: ",", semi: ";" }[sel];
    return { rows: parseCSV(text, d), delim: d };
  }
  function toCSV(rows) {
    return rows.map(function (r) {
      return r.map(function (f) {
        f = String(f);
        return /[",\n\t;]/.test(f) ? '"' + f.replace(/"/g, '""') + '"' : f;
      }).join(",");
    }).join("\n") + "\n";
  }
  function download(name, text) {
    var blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function outputCSV(name, text) {
    var o = $("export-out");
    o.value = text;
    o.hidden = false;
    download(name, text);
    return name;
  }
  function confirmTwice(btn, action) {
    if (btn.getAttribute("data-armed")) {
      btn.removeAttribute("data-armed");
      action();
      return;
    }
    var orig = btn.textContent;
    btn.setAttribute("data-armed", "1");
    btn.textContent = "Wirklich? Nochmal klicken";
    setTimeout(function () {
      if (btn.getAttribute("data-armed")) { btn.removeAttribute("data-armed"); btn.textContent = orig; }
    }, 4000);
  }
  function readFileInto(file, textId, afterLoad) {
    if (!file) return;
    var r = new FileReader();
    r.onload = function () { $(textId).value = String(r.result).replace(/^﻿/, ""); afterLoad(file.name.replace(/\.[^.]+$/, "")); };
    r.readAsText(file, "UTF-8");
  }

  /* ---------- Vokabeln ---------- */
  var vq = [], vflip = false;

  function activeDeckIds() {
    var ids = S.decks.map(function (d) { return d.id; });
    var sel = (S.set.selDecks || []).filter(function (id) { return ids.indexOf(id) >= 0; });
    return sel.length ? sel : ids;
  }
  function vBuild() {
    var ids = activeDeckIds();
    vq = [];
    S.decks.forEach(function (d) {
      if (ids.indexOf(d.id) < 0) return;
      d.cards.forEach(function (c) { if (!S.vknown[c.id]) vq.push(c); });
    });
    shuffle(vq);
    vflip = false;
  }
  function vCounts() {
    var ids = activeDeckIds(), t = 0, k = 0;
    S.decks.forEach(function (d) {
      if (ids.indexOf(d.id) < 0) return;
      d.cards.forEach(function (c) { t++; if (S.vknown[c.id]) k++; });
    });
    return { total: t, known: k };
  }
  function vChips() {
    var box = $("deckchips"), act = activeDeckIds();
    box.textContent = "";
    S.decks.forEach(function (d) {
      var b = el("button", "chip", d.name + " (" + d.cards.length + ")");
      b.type = "button";
      b.setAttribute("aria-pressed", act.indexOf(d.id) >= 0 ? "true" : "false");
      b.addEventListener("click", function () {
        var next = toggleIn(act, d.id);
        if (!next.length) return;
        S.set.selDecks = next; save(); vBuild(); vRender();
      });
      box.appendChild(b);
    });
  }
  function vRender() {
    vChips();
    $("dir-a").setAttribute("aria-pressed", S.set.dir === "a" ? "true" : "false");
    $("dir-b").setAttribute("aria-pressed", S.set.dir === "b" ? "true" : "false");
    var c = vCounts();
    $("v-fill").style.width = (c.total ? c.known / c.total * 100 : 0) + "%";
    $("v-known").textContent = c.known + " gewusst";
    $("v-left").textContent = (c.total - c.known) + " übrig";
    var empty = vq.length === 0;
    $("v-study").hidden = empty;
    $("v-finish").hidden = !empty;
    if (empty) {
      if (c.total === 0) {
        $("v-finish-title").textContent = "Keine Karten";
        $("v-finish-text").textContent = "Importiere Vokabeln im Tab „Daten“.";
        $("v-restart").hidden = true;
      } else {
        $("v-finish-title").textContent = "Alle " + c.total + " Karten gewusst";
        $("v-finish-text").textContent = "Starte neu oder wähle einen anderen Stapel.";
        $("v-restart").hidden = false;
      }
      return;
    }
    var card = vq[0];
    var front = S.set.dir === "a" ? card.a : card.b;
    var back = S.set.dir === "a" ? card.b : card.a;
    var txt = vflip ? back : front;
    $("v-side").textContent = vflip ? "Rückseite" : "Vorderseite";
    var m = $("v-main");
    m.textContent = txt;
    m.className = "big " + (JP.test(txt) ? "jp" : "");
    $("v-hint").textContent = vflip ? "Gewusst oder nochmal?" : "Tippen zum Umdrehen";
    $("v-again").disabled = !vflip;
    $("v-got").disabled = !vflip;
  }
  function vFlip() { if (!vq.length) return; vflip = !vflip; vRender(); }
  function vGot() { if (!vflip || !vq.length) return; S.vknown[vq.shift().id] = true; vflip = false; save(); vRender(); }
  function vAgain() {
    if (!vflip || !vq.length) return;
    var c = vq.shift();
    vq.splice(Math.min(3, vq.length), 0, c);
    vflip = false; vRender();
  }
  function vResetDecks() {
    var ids = activeDeckIds();
    S.decks.forEach(function (d) {
      if (ids.indexOf(d.id) >= 0) d.cards.forEach(function (c) { delete S.vknown[c.id]; });
    });
    save(); vBuild(); vRender();
  }

  /* ---------- Grammatik ---------- */
  var gq = [], greveal = false, mcState = null, lastHelpId = null;

  function gMode() { return S.set.gmode === "tr" ? "tr" : "mc"; }
  function gItems() { return gMode() === "mc" ? S.mc : S.grammar; }
  function allPatterns() {
    var seen = [];
    gItems().forEach(function (g) { if (seen.indexOf(g.p) < 0) seen.push(g.p); });
    return seen;
  }
  function activePatterns() {
    var all = allPatterns();
    var sel = (S.set.selPatterns || []).filter(function (p) { return all.indexOf(p) >= 0; });
    return sel.length ? sel : all;
  }
  function gBuild() {
    var ap = activePatterns();
    gq = gItems().filter(function (g) { return ap.indexOf(g.p) >= 0 && !S.gdone[g.id]; });
    shuffle(gq);
    greveal = false;
    mcState = null;
  }
  function gChips() {
    var box = $("patchips"), act = activePatterns();
    box.textContent = "";
    allPatterns().forEach(function (p) {
      var b = el("button", "chip", p);
      b.type = "button";
      b.setAttribute("aria-pressed", act.indexOf(p) >= 0 ? "true" : "false");
      b.addEventListener("click", function () {
        var next = toggleIn(act, p);
        if (!next.length) return;
        S.set.selPatterns = next; save(); gBuild(); gRender();
      });
      box.appendChild(b);
    });
  }
  function gInfo() {
    var det = $("g-details");
    if (!gq.length) { det.hidden = true; lastHelpId = null; return; }
    var item = gq[0], P = S.patterns[item.p];
    det.hidden = false;
    if (lastHelpId !== item.id) { det.open = false; lastHelpId = item.id; }
    var box = $("g-info");
    box.textContent = "";
    box.appendChild(el("strong", null, item.p));
    if (P && P.rule) {
      box.appendChild(document.createElement("br"));
      box.appendChild(document.createTextNode(P.rule));
    }
    if (P && P.link) {
      box.appendChild(document.createElement("br"));
      var a = el("a", null, P.linkname || P.link);
      a.href = P.link; a.target = "_blank"; a.rel = "noopener noreferrer";
      box.appendChild(a);
    }
  }
  function gRender() {
    $("gm-mc").setAttribute("aria-pressed", gMode() === "mc" ? "true" : "false");
    $("gm-tr").setAttribute("aria-pressed", gMode() === "tr" ? "true" : "false");
    gChips();
    var total = 0, nd = 0, ap = activePatterns();
    gItems().forEach(function (g) { if (ap.indexOf(g.p) >= 0) { total++; if (S.gdone[g.id]) nd++; } });
    $("g-fill").style.width = (total ? nd / total * 100 : 0) + "%";
    $("g-known").textContent = nd + " richtig";
    $("g-left").textContent = (total - nd) + " übrig";
    var empty = gq.length === 0;
    $("g-finish").hidden = !empty;
    $("m-study").hidden = empty || gMode() !== "mc";
    $("g-study").hidden = empty || gMode() !== "tr";
    if (empty) {
      if (total === 0) {
        $("g-finish-title").textContent = "Keine Aufgaben";
        $("g-finish-text").textContent = "Importiere Aufgaben im Tab „Daten“.";
        $("g-restart").hidden = true;
      } else {
        $("g-finish-title").textContent = "Alle " + total + " Aufgaben richtig";
        $("g-finish-text").textContent = "Wähle andere Muster oder starte neu.";
        $("g-restart").hidden = false;
      }
      gInfo();
      return;
    }
    if (gMode() === "mc") mcRender(); else trRender();
    gInfo();
  }
  function gResetItems() {
    var ap = activePatterns();
    gItems().forEach(function (g) { if (ap.indexOf(g.p) >= 0) delete S.gdone[g.id]; });
    save(); gBuild(); gRender();
  }
  function gSetMode(m) {
    S.set.gmode = m; S.set.selPatterns = []; save(); gBuild(); gRender();
  }

  /* Auswahlfragen */
  function mcRender() {
    var it = gq[0];
    if (!mcState || mcState.id !== it.id) {
      mcState = {
        id: it.id,
        opts: shuffle(it.o.map(function (t, i) { return { t: t, ok: i === 0 }; })),
        chosen: -1,
        right: false
      };
    }
    var answered = mcState.chosen >= 0;
    var correct = it.o[0];
    var stem = $("m-prompt");
    stem.textContent = "";
    it.q.split(BLANK).forEach(function (part) {
      if (!part) return;
      if (BLANK.test(part)) {
        var sp = el("span", answered ? "blank filled" : "blank", answered ? correct : part);
        stem.appendChild(sp);
      } else {
        stem.appendChild(document.createTextNode(part));
      }
    });
    var box = $("m-opts");
    box.textContent = "";
    mcState.opts.forEach(function (o, i) {
      var b = el("button", "opt");
      b.type = "button";
      b.appendChild(el("span", "num", String(i + 1)));
      b.appendChild(el("span", null, o.t));
      if (answered) {
        b.disabled = true;
        if (o.ok) b.classList.add("right");
        else if (i === mcState.chosen) b.classList.add("wrong");
        else b.classList.add("dim");
      } else {
        b.addEventListener("click", function () { mcChoose(i); });
      }
      box.appendChild(b);
    });
    $("m-answer").hidden = !answered;
    if (answered) {
      var v = $("m-verdict");
      v.textContent = mcState.right ? "Richtig." : "Falsch. Richtig ist: " + correct;
      v.className = "verdict " + (mcState.right ? "hit" : "miss");
      $("m-note").textContent = it.n || "";
    }
  }
  function mcChoose(i) {
    if (!gq.length || !mcState || mcState.chosen >= 0) return;
    mcState.chosen = i;
    mcState.right = !!mcState.opts[i].ok;
    gRender();
    $("m-next").focus();
  }
  function mcNext() {
    if (!gq.length || !mcState || mcState.chosen < 0) return;
    var it = gq.shift();
    if (mcState.right) S.gdone[it.id] = true;
    else gq.splice(Math.min(3, gq.length), 0, it);
    mcState = null;
    save(); gRender();
  }

  /* Übersetzen */
  function trRender() {
    var it = gq[0];
    richText($("g-prompt"), it.q);
    $("g-answer").hidden = !greveal;
    $("g-show").hidden = greveal;
    $("g-input").readOnly = greveal;
    if (!greveal) $("g-input").value = "";
  }
  function gReveal() {
    if (!gq.length) return;
    var it = gq[0], mine = $("g-input").value.trim(), ok = false;
    greveal = true;
    if (mine) {
      [it.a].concat(it.alt || []).forEach(function (c) { if (norm(c) === norm(mine)) ok = true; });
    }
    $("g-mine").textContent = mine || "(nichts eingegeben)";
    $("g-sol").textContent = it.a;
    var alts = it.alt || [];
    $("g-alt").textContent = alts.length ? "Auch möglich: " + alts.join(" / ") : "";
    $("g-alt").hidden = !alts.length;
    $("g-note").textContent = it.n || "";
    var v = $("g-verdict");
    if (ok) { v.textContent = "Stimmt mit einer Lösung überein."; v.className = "verdict hit"; }
    else if (mine) { v.textContent = "Weicht ab. Oft gibt es mehrere richtige Varianten, vergleiche selbst."; v.className = "verdict miss"; }
    else { v.textContent = ""; v.className = "verdict"; }
    gRender();
  }
  function gGot() { if (!greveal || !gq.length) return; S.gdone[gq.shift().id] = true; greveal = false; save(); gRender(); }
  function gAgain() {
    if (!greveal || !gq.length) return;
    var it = gq.shift();
    gq.splice(Math.min(3, gq.length), 0, it);
    greveal = false; gRender();
  }

  /* ---------- Daten: Vokabel-Import ---------- */
  function fillColSelect(id, ncols, defIndex) {
    var sel = $(id), cur = sel.value;
    var n = Math.max(2, ncols);
    sel.textContent = "";
    for (var i = 0; i < n; i++) {
      var o = el("option", null, "Spalte " + (i + 1));
      o.value = String(i);
      sel.appendChild(o);
    }
    sel.value = (cur !== "" && +cur < n) ? cur : String(defIndex);
  }
  function impCards() {
    var parsed = readInput("imp-text", "imp-delim");
    var rows = parsed.rows;
    var body = $("imp-header").checked ? rows.slice(1) : rows;
    var ncols = rows.reduce(function (m, r) { return Math.max(m, r.length); }, 0);
    fillColSelect("imp-col-a", ncols, 0);
    fillColSelect("imp-col-b", ncols, 1);
    var ca = +$("imp-col-a").value, cb = +$("imp-col-b").value;
    var cards = [], skipped = 0;
    body.forEach(function (r) {
      var a = r[ca] || "", b = r[cb] || "";
      if (a && b) cards.push({ a: a, b: b }); else skipped++;
    });
    return { cards: cards, skipped: skipped };
  }
  function impPreview() {
    var r = impCards(), t = $("imp-preview");
    t.textContent = "";
    var msg = $("imp-msg");
    if (!$("imp-text").value.trim()) { msg.textContent = ""; msg.className = "msg"; return; }
    var head = el("tr");
    head.appendChild(el("th", null, "Vorderseite"));
    head.appendChild(el("th", null, "Rückseite"));
    t.appendChild(head);
    r.cards.slice(0, 6).forEach(function (c) {
      var tr = el("tr");
      tr.appendChild(el("td", null, c.a));
      tr.appendChild(el("td", null, c.b));
      t.appendChild(tr);
    });
    msg.className = "msg";
    msg.textContent = r.cards.length + " Karten erkannt" + (r.skipped ? ", " + r.skipped + " Zeilen ohne beide Spalten werden übersprungen" : "") + ".";
  }
  function impGo() {
    var r = impCards(), msg = $("imp-msg");
    if (!r.cards.length) { msg.className = "msg err"; msg.textContent = "Keine Karten erkannt. Prüfe Trennzeichen und Spalten."; return; }
    var name = $("imp-deck").value.trim() || "Import";
    var deck = null;
    S.decks.forEach(function (d) { if (d.name === name) deck = d; });
    var added = 0, dup = 0;
    if (!deck) { deck = { id: uid(), name: name, cards: [] }; S.decks.push(deck); }
    r.cards.forEach(function (c) {
      var exists = deck.cards.some(function (x) { return x.a === c.a && x.b === c.b; });
      if (exists) { dup++; return; }
      deck.cards.push({ id: deck.id + "-" + uid(), a: c.a, b: c.b });
      added++;
    });
    S.set.selDecks = [];
    save(); vBuild();
    $("imp-text").value = ""; $("imp-file").value = ""; $("imp-deck").value = "";
    $("imp-preview").textContent = "";
    msg.className = "msg ok";
    msg.textContent = added + " Karten in „" + name + "“ importiert" + (dup ? ", " + dup + " doppelte übersprungen" : "") + ". Du findest sie im Tab „Vokabeln“.";
    dataRender();
  }

  /* ---------- Daten: Grammatik-Import ---------- */
  function mimpGo() {
    var parsed = readInput("mimp-text", "mimp-delim"), msg = $("mimp-msg");
    var rows = $("mimp-header").checked ? parsed.rows.slice(1) : parsed.rows;
    var added = 0, skipped = 0;
    rows.forEach(function (r) {
      var wrong = r.slice(3, 6).filter(Boolean);
      if (r.length < 4 || !r[0] || !r[1] || !r[2] || !wrong.length) { skipped++; return; }
      S.mc.push({ id: "m-" + uid(), p: r[0], q: r[1], o: [r[2]].concat(wrong), n: r[6] || "" });
      added++;
    });
    if (!added) { msg.className = "msg err"; msg.textContent = "Keine Fragen erkannt. Es werden mindestens vier Spalten gebraucht: Muster, Frage, richtige Antwort, eine falsche Antwort."; return; }
    S.set.selPatterns = [];
    save(); gBuild();
    $("mimp-text").value = ""; $("mimp-file").value = "";
    msg.className = "msg ok";
    msg.textContent = added + " Fragen importiert" + (skipped ? ", " + skipped + " Zeilen übersprungen" : "") + ". Du findest sie im Tab „Grammatik“ (Japanisch, Auswahl).";
    dataRender();
  }
  function gimpGo() {
    var parsed = readInput("gimp-text", "gimp-delim"), msg = $("gimp-msg");
    var rows = $("gimp-header").checked ? parsed.rows.slice(1) : parsed.rows;
    var added = 0, skipped = 0;
    rows.forEach(function (r) {
      if (r.length < 3 || !r[0] || !r[1] || !r[2]) { skipped++; return; }
      var sols = r[2].split("|").map(function (x) { return x.trim(); }).filter(Boolean);
      S.grammar.push({ id: "g-" + uid(), p: r[0], q: r[1], a: sols[0], alt: sols.slice(1), n: r[3] || "" });
      added++;
    });
    if (!added) { msg.className = "msg err"; msg.textContent = "Keine Sätze erkannt. Es werden mindestens drei Spalten gebraucht: Muster, Aufgabe, Lösung."; return; }
    S.set.selPatterns = [];
    save(); gBuild();
    $("gimp-text").value = ""; $("gimp-file").value = "";
    msg.className = "msg ok";
    msg.textContent = added + " Sätze importiert" + (skipped ? ", " + skipped + " Zeilen übersprungen" : "") + ". Du findest sie im Tab „Grammatik“ (Deutsch, Übersetzen).";
    dataRender();
  }

  /* ---------- Daten: Liste, Export, Zurücksetzen ---------- */
  function dataRender() {
    var list = $("decklist");
    list.textContent = "";
    S.decks.forEach(function (d) {
      var row = el("div", "deck");
      var left = el("div");
      left.appendChild(el("strong", null, d.name));
      left.appendChild(document.createTextNode(" "));
      left.appendChild(el("span", "n", d.cards.length + " Karten"));
      var grp = el("div", "grp");
      grp.style.display = "flex"; grp.style.gap = "8px";
      var ex = el("button", "ghost", "Export"); ex.type = "button";
      ex.addEventListener("click", function () {
        var fn = outputCSV(d.name.replace(/[^\w぀-鿿-]+/g, "_") + ".csv", toCSV(d.cards.map(function (c) { return [c.a, c.b]; })));
        dataMsg(fn + ": Text steht unten zum Kopieren, ein Download startet, falls der Browser ihn erlaubt.", "ok");
      });
      var del = el("button", "ghost danger", "Löschen"); del.type = "button";
      del.addEventListener("click", function () {
        confirmTwice(del, function () {
          d.cards.forEach(function (c) { delete S.vknown[c.id]; });
          S.decks = S.decks.filter(function (x) { return x.id !== d.id; });
          save(); vBuild(); dataRender();
        });
      });
      grp.appendChild(ex); grp.appendChild(del);
      row.appendChild(left); row.appendChild(grp);
      list.appendChild(row);
    });
    if (!S.decks.length) list.appendChild(el("p", "sub", "Keine Stapel vorhanden."));
    var dn = $("deck-names");
    dn.textContent = "";
    S.decks.forEach(function (d) { var o = el("option"); o.value = d.name; dn.appendChild(o); });
  }
  function dataMsg(text, cls) { var m = $("data-msg"); m.textContent = text; m.className = "msg " + (cls || ""); }

  /* ---------- Ansichten ---------- */
  function show(name) {
    view = name;
    ["vocab", "grammar", "data"].forEach(function (v) { $("view-" + v).hidden = v !== name; });
    Array.prototype.forEach.call(document.querySelectorAll(".tabs button"), function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-view") === name ? "true" : "false");
    });
    try { history.replaceState(null, "", "#" + name); } catch (e) {}
    if (name === "vocab") vRender();
    else if (name === "grammar") gRender();
    else dataRender();
  }

  /* ---------- Start ---------- */
  function init() {
    try { localStorage.setItem(KEY + "-test", "1"); localStorage.removeItem(KEY + "-test"); }
    catch (e) { storageOK = false; $("storage-warn").hidden = false; }
    S = load();
    vBuild(); gBuild();

    Array.prototype.forEach.call(document.querySelectorAll(".tabs button"), function (b) {
      b.addEventListener("click", function () { show(b.getAttribute("data-view")); });
    });

    $("v-card").addEventListener("click", vFlip);
    $("v-got").addEventListener("click", vGot);
    $("v-again").addEventListener("click", vAgain);
    $("v-shuffle").addEventListener("click", function () { shuffle(vq); vflip = false; vRender(); });
    $("v-reset").addEventListener("click", vResetDecks);
    $("v-restart").addEventListener("click", vResetDecks);
    $("dir-a").addEventListener("click", function () { S.set.dir = "a"; vflip = false; save(); vRender(); });
    $("dir-b").addEventListener("click", function () { S.set.dir = "b"; vflip = false; save(); vRender(); });

    $("gm-mc").addEventListener("click", function () { gSetMode("mc"); });
    $("gm-tr").addEventListener("click", function () { gSetMode("tr"); });
    $("m-next").addEventListener("click", mcNext);
    $("g-show").addEventListener("click", gReveal);
    $("g-got").addEventListener("click", gGot);
    $("g-again").addEventListener("click", gAgain);
    $("g-reset").addEventListener("click", gResetItems);
    $("g-restart").addEventListener("click", gResetItems);

    ["imp-text", "imp-delim", "imp-header", "imp-col-a", "imp-col-b"].forEach(function (id) {
      $(id).addEventListener(id === "imp-text" ? "input" : "change", impPreview);
    });
    $("imp-file").addEventListener("change", function (e) {
      readFileInto(e.target.files[0], "imp-text", function (base) {
        if (!$("imp-deck").value.trim()) $("imp-deck").value = base;
        impPreview();
      });
    });
    $("imp-go").addEventListener("click", impGo);
    $("mimp-file").addEventListener("change", function (e) { readFileInto(e.target.files[0], "mimp-text", function () {}); });
    $("mimp-go").addEventListener("click", mimpGo);
    $("gimp-file").addEventListener("change", function (e) { readFileInto(e.target.files[0], "gimp-text", function () {}); });
    $("gimp-go").addEventListener("click", gimpGo);

    $("exp-all").addEventListener("click", function () {
      var rows = [];
      S.decks.forEach(function (d) { d.cards.forEach(function (c) { rows.push([c.a, c.b]); }); });
      download("alle-vokabeln.csv", toCSV(rows));
      dataMsg("alle-vokabeln.csv wurde gespeichert.", "ok");
    });
    $("exp-mc").addEventListener("click", function () {
      var rows = [["Muster", "Frage", "Richtige Antwort", "Falsch 1", "Falsch 2", "Falsch 3", "Hinweis"]];
      S.mc.forEach(function (m) {
        var wrong = m.o.slice(1);
        while (wrong.length < 3) wrong.push("");
        rows.push([m.p, m.q, m.o[0]].concat(wrong.slice(0, 3), [m.n || ""]));
      });
      download("auswahlfragen.csv", toCSV(rows));
      dataMsg("auswahlfragen.csv wurde gespeichert (mit Kopfzeile).", "ok");
    });
    $("exp-gram").addEventListener("click", function () {
      var rows = [["Muster", "Aufgabe", "Lösung", "Hinweis"]];
      S.grammar.forEach(function (g) { rows.push([g.p, g.q, [g.a].concat(g.alt || []).join(" | "), g.n || ""]); });
      download("uebersetzungssaetze.csv", toCSV(rows));
      dataMsg("uebersetzungssaetze.csv wurde gespeichert (mit Kopfzeile).", "ok");
    });
    $("reset-progress").addEventListener("click", function () {
      S.vknown = {}; S.gdone = {}; save(); vBuild(); gBuild(); dataMsg("Fortschritt zurückgesetzt.", "ok");
    });
    $("reset-all").addEventListener("click", function () {
      if (!window.confirm("Alle importierten Daten und den Fortschritt löschen und die Standarddaten laden?")) return;
      S = seed(); save(); vBuild(); gBuild(); dataRender(); dataMsg("Standarddaten geladen.", "ok");
    });

    document.addEventListener("keydown", function (e) {
      var t = e.target && e.target.tagName;
      if (t === "TEXTAREA" || t === "INPUT" || t === "SELECT") return;
      if (view === "vocab") {
        if (e.key === " " && t !== "BUTTON") { e.preventDefault(); vFlip(); }
        else if (e.key === "ArrowRight") vGot();
        else if (e.key === "ArrowLeft") vAgain();
      } else if (view === "grammar") {
        if (gMode() === "mc") {
          if (/^[1-4]$/.test(e.key)) mcChoose(+e.key - 1);
          else if (e.key === "ArrowRight") mcNext();
        } else {
          if (e.key === "ArrowRight") gGot();
          else if (e.key === "ArrowLeft") gAgain();
        }
      }
    });

    var h = location.hash.replace("#", "");
    show(["vocab", "grammar", "data"].indexOf(h) >= 0 ? h : "vocab");
  }

  init();
})();
