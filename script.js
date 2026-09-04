const curatedPhrases = [
  {
    sentence: "まぜそばって知ってますか",
    english: "Do you know what mazesoba is?",
    literal: "Mazesoba — speaking of it — do you know?",
    pieces: [
      ["まぜそば", "まぜそば", "mazesoba", "Mazesoba", "A Japanese noodle dish served without broth; literally “mixed noodles.”"],
      ["って", "って", "tte", "speaking of; called", "A casual topic or quotation marker, common in conversation."],
      ["知ってます", "しってます", "shittemasu", "know", "A conversational contraction of 知っています, the polite form of “to know.”"],
      ["か", "か", "ka", "question marker", "Placed at the end to make a polite question."],
    ],
  },
  {
    sentence: "趣味は日本語を勉強することとアプリ開発です。どうぞよろしくお願いします。",
    english: "My hobbies are studying Japanese and developing apps. Nice to meet you.",
    literal: "As for hobbies: studying Japanese and app development. Please treat me kindly.",
    pieces: [
      ["趣味は", "しゅみは", "shumi wa", "as for my hobbies", "趣味 means hobby; は marks it as the topic."],
      ["日本語を", "にほんごを", "nihongo o", "Japanese", "日本語 means the Japanese language; を marks the object."],
      ["勉強すること", "べんきょうすること", "benkyō suru koto", "studying", "こと turns the verb 勉強する into a noun-like activity."],
      ["アプリ開発です", "アプリかいはつです", "apuri kaihatsu desu", "app development", "A polite noun phrase: “is app development.”"],
      ["よろしくお願いします", "よろしくおねがいします", "yoroshiku onegaishimasu", "nice to meet you", "A set phrase asking for goodwill; the natural English changes with context."],
    ],
  },
  {
    sentence: "ビジネスアナリティクスを専攻し、去年ディーキン大学を卒業しました。",
    english: "I majored in Business Analytics and graduated from Deakin University last year.",
    literal: "Majoring in Business Analytics, last year I graduated from Deakin University.",
    pieces: [
      ["ビジネスアナリティクスを", "ビジネスアナリティクスを", "bijinesu anaritikusu o", "Business Analytics", "を marks Business Analytics as the field being studied."],
      ["専攻し", "せんこうし", "senkō shi", "majored in; and", "The connecting form of 専攻する, linking this action to the next."],
      ["去年", "きょねん", "kyonen", "last year", "A common time word; no particle is needed here."],
      ["ディーキン大学を", "ディーキンだいがくを", "Dīkin daigaku o", "Deakin University", "大学 means university; を is used with 卒業する in this construction."],
      ["卒業しました", "そつぎょうしました", "sotsugyō shimashita", "graduated", "Polite past form of 卒業する."],
    ],
  },
  {
    sentence: "ベトナムから来ました。",
    english: "I came from Vietnam.",
    literal: "From Vietnam, came.",
    pieces: [
      ["ベトナム", "ベトナム", "Betonamu", "Vietnam", "Country names are commonly written in katakana."],
      ["から", "から", "kara", "from", "Marks the starting point or origin."],
      ["来ました", "きました", "kimashita", "came", "Polite past form of 来る, “to come.”"],
    ],
  },
  {
    sentence: "ちょうど卒業したところです",
    english: "I just graduated.",
    literal: "I am at the point of having just graduated.",
    pieces: [
      ["ちょうど", "ちょうど", "chōdo", "just; exactly", "Emphasizes that the timing is exact or very recent."],
      ["卒業した", "そつぎょうした", "sotsugyō shita", "graduated", "Plain past form of 卒業する."],
      ["ところです", "ところです", "tokoro desu", "have just done", "Verb-past + ところ expresses that something has just happened."],
    ],
  },
  {
    sentence: "どうぞよろしくお願いします。",
    english: "Nice to meet you.",
    literal: "Please regard me favorably.",
    pieces: [
      ["どうぞ", "どうぞ", "dōzo", "please", "Adds warmth and emphasis to a polite request."],
      ["よろしく", "よろしく", "yoroshiku", "favorably; kindly", "The adverbial form of よろしい, used in this set phrase."],
      ["お願いします", "おねがいします", "onegaishimasu", "I ask; please", "A polite request; together the phrase expresses goodwill."],
    ],
  },
  {
    sentence: "去年、ディーキン大学を卒業しました",
    english: "I graduated from Deakin University last year.",
    literal: "Last year, from Deakin University, graduated.",
    pieces: [
      ["去年", "きょねん", "kyonen", "last year", "A relative time expression."],
      ["ディーキン大学を", "ディーキンだいがくを", "Dīkin daigaku o", "Deakin University", "With 卒業する, を marks the institution one graduates from."],
      ["卒業しました", "そつぎょうしました", "sotsugyō shimashita", "graduated", "Polite past form."],
    ],
  },
  {
    sentence: "私はメルボルンに行ったことがあります",
    english: "I have been to Melbourne.",
    literal: "As for me, the experience of going to Melbourne exists.",
    pieces: [
      ["私は", "わたしは", "watashi wa", "as for me", "私 is “I”; は introduces the topic."],
      ["メルボルンに", "メルボルンに", "Meruborun ni", "to Melbourne", "に marks the destination."],
      ["行ったことが", "いったことが", "itta koto ga", "the experience of going", "Past verb + こと turns the event into an experience."],
      ["あります", "あります", "arimasu", "there is; have", "In this pattern it means “have the experience of.”"],
    ],
  },
  {
    sentence: "ちょっとだけ話せる。",
    english: "I can speak a little.",
    literal: "Just a little, can speak.",
    pieces: [
      ["ちょっと", "ちょっと", "chotto", "a little", "A very common softener meaning a little or briefly."],
      ["だけ", "だけ", "dake", "only", "Limits the amount: “only this much.”"],
      ["話せる", "はなせる", "hanaseru", "can speak", "Potential form of 話す, “to speak.”"],
    ],
  },
  {
    sentence: "お互いに日本語で助け合おう！",
    english: "Let’s help each other in Japanese!",
    literal: "Mutually, in Japanese, let’s help one another!",
    pieces: [
      ["お互いに", "おたがいに", "otagai ni", "each other", "Expresses a mutual relationship or action."],
      ["日本語で", "にほんごで", "nihongo de", "in Japanese", "で marks the language or means used."],
      ["助け合おう", "たすけあおう", "tasukeaō", "let’s help each other", "Volitional form of 助け合う, an action done mutually."],
    ],
  },
  {
    sentence: "お互いに日本語で助け合いましょう。",
    english: "Let’s help each other in Japanese.",
    literal: "Mutually, in Japanese, let us help one another.",
    pieces: [
      ["お互いに", "おたがいに", "otagai ni", "each other", "Expresses mutuality."],
      ["日本語で", "にほんごで", "nihongo de", "in Japanese", "で marks the language used."],
      ["助け合いましょう", "たすけあいましょう", "tasukeaimashō", "let’s help each other", "Polite volitional form, softer than 助け合おう."],
    ],
  },
  {
    sentence: "それを知りませんでした。",
    english: "I didn’t know that.",
    literal: "That, did not know.",
    pieces: [
      ["それを", "それを", "sore o", "that", "それ refers to something near the listener; を marks the object."],
      ["知りませんでした", "しりませんでした", "shirimasen deshita", "did not know", "Polite negative past form of 知る."],
    ],
  },
  {
    sentence: "それ、知らなかった。",
    english: "I didn’t know that.",
    literal: "That — didn’t know.",
    pieces: [
      ["それ", "それ", "sore", "that", "Casually names the thing being discussed."],
      ["知らなかった", "しらなかった", "shiranakatta", "didn’t know", "Casual negative past form of 知る."],
    ],
  },
  {
    sentence: "そうなんだ、知らなかった！",
    english: "Oh, is that so? I didn’t know!",
    literal: "So that’s how it is — I didn’t know!",
    pieces: [
      ["そうなんだ", "そうなんだ", "sō nan da", "oh, is that so", "A casual reaction showing that new information has clicked."],
      ["知らなかった", "しらなかった", "shiranakatta", "didn’t know", "Casual negative past of 知る."],
    ],
  },
];

const customStorageKey = "bambie-custom-phrases";
const customPhrases = getCustomPhrases();
const phrases = [...curatedPhrases, ...customPhrases];
const bySentence = new Map(phrases.map((phrase) => [normalize(phrase.sentence), phrase]));
let currentPhrase = phrases[0];
let practiceIndex = 3;
let toastTimer;

const sentenceInput = document.querySelector("#sentence-input");
const sentenceDisplay = document.querySelector("#sentence-display");
const englishDisplay = document.querySelector("#english-display");
const literalDisplay = document.querySelector("#literal-display");
const tokenGrid = document.querySelector("#token-grid");
const saveButton = document.querySelector("#save-button");
const toast = document.querySelector("#toast");
const customSentenceForm = document.querySelector("#custom-sentence-form");
const customSentenceLabel = document.querySelector("#custom-sentence-label");
const customPieces = document.querySelector("#custom-pieces");

function normalize(value) {
  return value.trim().replace(/\s+/g, "").replace(/[。！？!?]+$/u, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCustomPhrases() {
  try {
    const stored = JSON.parse(localStorage.getItem(customStorageKey) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored
      .filter((phrase) => phrase && typeof phrase.sentence === "string" && Array.isArray(phrase.pieces))
      .map((phrase) => ({ ...phrase, custom: true }));
  } catch {
    return [];
  }
}

function setCustomPhrases() {
  localStorage.setItem(customStorageKey, JSON.stringify(customPhrases));
}

function updateLibraryCount() {
  document.querySelector("#library-count").textContent = phrases.length;
}

function getSaved() {
  try { return JSON.parse(localStorage.getItem("bambie-saved") || "[]"); }
  catch { return []; }
}

function setSaved(items) {
  localStorage.setItem("bambie-saved", JSON.stringify(items));
}

function updateSaveButton() {
  const saved = getSaved();
  const isSaved = saved.includes(currentPhrase.sentence);
  saveButton.setAttribute("aria-pressed", String(isSaved));
  saveButton.innerHTML = isSaved ? '<span aria-hidden="true">✓</span> Saved' : '<span aria-hidden="true">＋</span> Save sentence';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function segmentJapanese(sentence) {
  try {
    if (Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
      const pieces = [...segmenter.segment(sentence)]
        .filter((part) => part.isWordLike)
        .map((part) => part.segment.trim())
        .filter(Boolean);
      if (pieces.length) return pieces;
    }
  } catch {
    // A single editable piece is a safe fallback on older browsers.
  }
  return [sentence.trim()];
}

function addCustomPieceRow({ word = "", reading = "", meaning = "" } = {}) {
  const row = document.createElement("div");
  row.className = "custom-piece-row";
  row.innerHTML = `
    <input class="piece-field" data-field="word" type="text" value="${escapeHtml(word)}" placeholder="Word" aria-label="Japanese word" required />
    <input class="piece-field" data-field="reading" type="text" value="${escapeHtml(reading)}" placeholder="Reading" aria-label="Reading" />
    <input class="piece-field" data-field="meaning" type="text" value="${escapeHtml(meaning)}" placeholder="Meaning" aria-label="Meaning" required />
    <button class="remove-piece" type="button" aria-label="Remove word piece">×</button>
  `;
  row.querySelector(".remove-piece").addEventListener("click", () => {
    if (customPieces.children.length === 1) {
      row.querySelector('[data-field="word"]').value = "";
      row.querySelector('[data-field="reading"]').value = "";
      row.querySelector('[data-field="meaning"]').value = "";
      return;
    }
    row.remove();
  });
  customPieces.append(row);
}

function openCustomSentenceForm(sentence) {
  customSentenceLabel.textContent = sentence;
  customSentenceForm.dataset.sentence = sentence;
  document.querySelector("#custom-english").value = "";
  document.querySelector("#custom-literal").value = "";
  customPieces.innerHTML = "";
  segmentJapanese(sentence).forEach((word) => addCustomPieceRow({ word }));
  customSentenceForm.hidden = false;
  customSentenceForm.scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("#custom-english").focus({ preventScroll: true });
}

function closeCustomSentenceForm() {
  customSentenceForm.hidden = true;
  customSentenceForm.removeAttribute("data-sentence");
}

function showPiece(piece, index) {
  document.querySelectorAll(".token").forEach((token, tokenIndex) => token.classList.toggle("is-active", tokenIndex === index));
  document.querySelector("#detail-index").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#detail-word").innerHTML = `${escapeHtml(piece[0])}<rt>${escapeHtml(piece[1])}</rt>`;
  document.querySelector("#detail-romaji").textContent = piece[2];
  document.querySelector("#detail-meaning").textContent = piece[3];
  document.querySelector("#detail-note").textContent = piece[4];
}

function renderPhrase(phrase) {
  currentPhrase = phrase;
  sentenceInput.value = phrase.sentence;
  sentenceDisplay.textContent = phrase.sentence;
  englishDisplay.textContent = phrase.english;
  literalDisplay.textContent = phrase.literal;
  document.querySelector("#word-count").textContent = `${phrase.pieces.length} ${phrase.pieces.length === 1 ? "piece" : "pieces"}`;
  tokenGrid.innerHTML = phrase.pieces.map((piece, index) => `
    <button class="token${index === 0 ? " is-active" : ""}" type="button" data-token="${index}">
      <span class="token-num">${String(index + 1).padStart(2, "0")}</span>
      <ruby>${escapeHtml(piece[0])}<rt>${escapeHtml(piece[1])}</rt></ruby>
      <span class="token-meaning">${escapeHtml(piece[3])}</span>
    </button>
  `).join("");
  tokenGrid.querySelectorAll(".token").forEach((token) => {
    token.addEventListener("click", () => showPiece(phrase.pieces[Number(token.dataset.token)], Number(token.dataset.token)));
  });
  showPiece(phrase.pieces[0], 0);
  updateSaveButton();
}

document.querySelector("#sentence-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const sentence = sentenceInput.value.trim();
  if (!sentence) {
    showToast("Add a Japanese sentence first.");
    sentenceInput.focus();
    return;
  }
  const phrase = bySentence.get(normalize(sentence));
  if (!phrase) {
    openCustomSentenceForm(sentence);
    return;
  }
  closeCustomSentenceForm();
  renderPhrase(phrase);
  document.querySelector("#analysis-card").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#add-piece-button").addEventListener("click", () => addCustomPieceRow());
document.querySelector("#cancel-custom-sentence").addEventListener("click", closeCustomSentenceForm);

customSentenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const sentence = customSentenceForm.dataset.sentence?.trim();
  const english = document.querySelector("#custom-english").value.trim();
  const literal = document.querySelector("#custom-literal").value.trim();
  const pieces = [...customPieces.querySelectorAll(".custom-piece-row")]
    .map((row) => {
      const word = row.querySelector('[data-field="word"]').value.trim();
      const reading = row.querySelector('[data-field="reading"]').value.trim();
      const meaning = row.querySelector('[data-field="meaning"]').value.trim();
      return word ? [word, reading || word, "", meaning, "Part of your custom sentence."] : null;
    })
    .filter(Boolean);

  if (!sentence || !english || !pieces.length || pieces.some((piece) => !piece[3])) {
    showToast("Add the English meaning and a meaning for each word piece.");
    return;
  }

  const phrase = {
    sentence,
    english,
    literal: literal || english,
    pieces,
    custom: true,
  };

  customPhrases.push(phrase);
  phrases.push(phrase);
  bySentence.set(normalize(sentence), phrase);
  setCustomPhrases();
  updateLibraryCount();
  closeCustomSentenceForm();
  renderPhrase(phrase);
  renderLibrary(document.querySelector("#library-search").value);
  showToast("Added to your phrase library.");
  document.querySelector("#analysis-card").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    closeCustomSentenceForm();
    sentenceInput.value = button.dataset.sample;
    renderPhrase(bySentence.get(normalize(button.dataset.sample)));
  });
});

saveButton.addEventListener("click", () => {
  const saved = getSaved();
  const index = saved.indexOf(currentPhrase.sentence);
  if (index >= 0) {
    saved.splice(index, 1);
    showToast("Removed from your saved sentences.");
  } else {
    saved.unshift(currentPhrase.sentence);
    showToast("Saved for another study session.");
  }
  setSaved(saved);
  updateSaveButton();
  renderLibrary(document.querySelector("#library-search").value);
});

const readingToggle = document.querySelector("#reading-toggle");
readingToggle.addEventListener("click", () => {
  const hidden = document.body.classList.toggle("readings-hidden");
  readingToggle.setAttribute("aria-pressed", String(hidden));
  readingToggle.querySelector("strong").textContent = hidden ? "Hidden" : "Visible";
});

function changeView(name) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    const active = panel.dataset.viewPanel === name;
    panel.hidden = !active;
    panel.classList.toggle("is-visible", active);
  });
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === name));
  if (name === "library") renderLibrary(document.querySelector("#library-search").value);
  if (name === "practice") renderPractice();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => changeView(button.dataset.view)));

function renderLibrary(query = "") {
  const cleanQuery = query.trim().toLocaleLowerCase();
  const results = phrases.filter((phrase) => `${phrase.sentence} ${phrase.english}`.toLocaleLowerCase().includes(cleanQuery));
  const libraryGrid = document.querySelector("#library-grid");
  libraryGrid.innerHTML = results.map((phrase) => `
    <article class="phrase-card">
      <span class="eyebrow">${phrase.pieces.length} word pieces</span>
      <h2 lang="ja">${escapeHtml(phrase.sentence)}</h2>
      <p>${escapeHtml(phrase.english)}</p>
      <footer>
        <span>${getSaved().includes(phrase.sentence) ? "Saved" : phrase.custom ? "Your sentence" : "Curated phrase"}</span>
        <button type="button" data-open-sentence="${escapeHtml(phrase.sentence)}">Study sentence →</button>
      </footer>
    </article>
  `).join("");
  document.querySelector("#library-empty").hidden = results.length > 0;
  libraryGrid.querySelectorAll("[data-open-sentence]").forEach((button) => {
    button.addEventListener("click", () => {
      renderPhrase(bySentence.get(normalize(button.dataset.openSentence)));
      changeView("study");
    });
  });
}

document.querySelector("#library-search").addEventListener("input", (event) => renderLibrary(event.target.value));

function renderPractice() {
  const phrase = phrases[practiceIndex];
  document.querySelector("#practice-number").textContent = `${String(practiceIndex + 1).padStart(2, "0")} / ${phrases.length}`;
  document.querySelector("#practice-japanese").textContent = phrase.sentence;
  document.querySelector("#practice-english").textContent = phrase.english;
  document.querySelector("#practice-answer").hidden = true;
  document.querySelector("#reveal-button").hidden = false;
}

document.querySelector("#reveal-button").addEventListener("click", (event) => {
  document.querySelector("#practice-answer").hidden = false;
  event.currentTarget.hidden = true;
});

document.querySelector("#next-button").addEventListener("click", () => {
  practiceIndex = (practiceIndex + 1) % phrases.length;
  renderPractice();
});

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const lastVisit = localStorage.getItem("bambie-last-visit");
  let streak = Number(localStorage.getItem("bambie-streak") || 0);
  if (lastVisit !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = lastVisit === yesterday ? streak + 1 : 1;
    localStorage.setItem("bambie-last-visit", today);
    localStorage.setItem("bambie-streak", String(streak));
  }
  document.querySelector("#streak-count").textContent = Math.max(streak, 1);
}

function updateTodayLabel() {
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;

  const register = (tool) => {
    try {
      void Promise.resolve(context.registerTool(tool)).catch(() => {});
    } catch {
      // WebMCP is progressive enhancement; the visible interface remains complete.
    }
  };

  register({
    name: "study_sentence",
    title: "Study a Japanese sentence",
    description: "Open the word-by-word lesson for a sentence in Bambie’s phrase library.",
    inputSchema: {
      type: "object",
      properties: { sentence: { type: "string", description: "Exact Japanese sentence from Bambie’s phrase library, including custom sentences." } },
      required: ["sentence"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input.sentence !== "string") throw new Error("A Japanese sentence is required.");
      const phrase = bySentence.get(normalize(input.sentence));
      if (!phrase) throw new Error("That sentence is not in Bambie’s phrase library yet.");
      renderPhrase(phrase);
      changeView("study");
      return { sentence: phrase.sentence, english: phrase.english, pieces: phrase.pieces.length };
    },
  });

  register({
    name: "save_study_sentence",
    title: "Save a study sentence",
    description: "Save one Japanese sentence from Bambie’s phrase library to this browser’s study list.",
    inputSchema: {
      type: "object",
      properties: { sentence: { type: "string", description: "Exact Japanese sentence from Bambie’s phrase library, including custom sentences." } },
      required: ["sentence"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input.sentence !== "string") throw new Error("A Japanese sentence is required.");
      const phrase = bySentence.get(normalize(input.sentence));
      if (!phrase) throw new Error("That sentence is not in Bambie’s phrase library yet.");
      const saved = getSaved();
      if (!saved.includes(phrase.sentence)) {
        saved.unshift(phrase.sentence);
        setSaved(saved);
      }
      renderLibrary(document.querySelector("#library-search").value);
      return { sentence: phrase.sentence, saved: true, savedCount: saved.length };
    },
  });
}

updateLibraryCount();
renderPhrase(phrases[0]);
renderLibrary();
updateStreak();
updateTodayLabel();
registerWebMcpTools();
