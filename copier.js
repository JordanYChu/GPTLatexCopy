const katexCopyEL = "katex-display";

function addLatexListeners() {
    const katexEls = document.getElementsByClassName(katexCopyEL);

    let prevCount = katexEls.length;

    const observer = new MutationObserver(() => {
        const newCount = katexEls.length;
        if (newCount !== prevCount) {
            prevCount = newCount;

            Array.from(katexEls).forEach((katexEl) => {
                katexEl.classList.add("custom-latex-display");
                katexEl.setAttribute("margin", "0");
                katexEl.setAttribute("padding", "1em 0");
                katexEl.addEventListener("click", () => {
                    katexEl.classList.remove("copied");
                    console.log("copied");
                    const latex =
                        katexEl.getElementsByTagName("annotation")[0].innerHTML;
                    navigator.clipboard.writeText(latex);

                    // animation for copy
                    katexEl.classList.add("copied");
                    katexEl.style.setProperty("--copied-str", '"Copied!"');
                    katexEl.addEventListener("animationend", () => {
                        katexEl.classList.remove("copied");
                        katexEl.style.setProperty("--copied-str", '"Copy"');
                    });
                });
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLatexListeners);
} else {
    addLatexListeners();
}
