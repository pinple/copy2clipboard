// ==UserScript==
// @name         copy2clipboard
// @namespace    https://github.com/Neulana/copy2clipboard
// @version      1.0
// @description  a tampermonkey to copy code from stackoverflow.com etc.
// @author       pinple; https://github.com/pinple
// @include      https://stackoverflow.com/*
// @include      https://*.zhihu.com/*
// @include      https://www.jianshu.com/*
// @include      https://dev.to/*
// @include      *.github.io/*
// @grant        none
// @license      Apache-2.0
// ==/UserScript==

// To remove IDE warnings
var $ = window.jQuery;

(() => {
    "use strict";

    function selectElementText(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function getSelectedText() {
        var t = '';
        if (window.getSelection) {
            t = window.getSelection();
        } else if (document.getSelection) {
            t = document.getSelection();
        } else if (document.selection) {
            t = document.selection.createRange().text;
        }
        return t;
    }

    function copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", text);

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy"); // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    $("pre").each(function () {
        var pre = this;
        $(pre).wrapAll('<div style= "position: relative;"></div>');

        var $copyCodeButton = $("<button class='copy-code-button'>Copy</button>");
        $copyCodeButton.css({
            "position": "absolute",
            "top": "1px",
            "right": "1px",
            "padding": "3px",
            "display": "none",
            "background-color": "white",
            "color": "#313E4E",
            "border-radius": "5px",
            "-moz-border-radius": "5px",
            "-webkit-border-radius": "5px",
            "border": "2px solid #CCCCCC"
        });

        setTimeout(function () {
            if ($codeContainer.length == 0) {
                $(pre).contents().filter(function () {
                    return this.className !== "copy-code-button";
                }).wrapAll('<code style= "overflow-x: auto; padding: 0px;"></code>');
                $codeContainer = $copyCodeButton.siblings("code").get(0);
            } else {
                $codeContainer = $codeContainer.get(0);
            }
        }, 0);

        $copyCodeButton.click(function () {
            selectElementText($codeContainer);
            var selectedText = getSelectedText();

            var buttonNewText = "";
            if (copyToClipboard(selectedText) == true) {
                buttonNewText = "Copied";
                selectElementText($codeContainer);
            } else {
                buttonNewText = "Unable to copy";
                selectElementText($codeContainer);
            }

            $(this).text(buttonNewText);
            var that = this;

            setTimeout(function () {
                $(that).text("Copy");
                var selection = window.getSelection(); // clear text range
                selection.removeAllRanges();
            }, 400);
        });

        $(this).append($copyCodeButton);
        var $codeContainer = $copyCodeButton.siblings("code");
        $("pre").hover(function () {
            $(this).children(".copy-code-button").css("display", "block");
        }, function () {
            $(this).children(".copy-code-button").css("display", "none");
        });
    });
})();
