import React, { useCallback } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import styled from 'styled-components';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const Wrapper = styled.div`
  & {
    .container_editor_area {
      tab-size: 4ch;
      max-height: 400px;
      overflow: auto;
      margin: 1.67em 0;
    }

    .container__editor {
      font-size: 12px;
      font-variant-ligatures: common-ligatures;
      background-color: #fafafa;
      border-radius: 3px;
    }

    .container__editor textarea {
      outline: 0;
    }

    .button {
      display: inline-block;
      padding: 0 6px;
      text-decoration: none;
      background: #000;
      color: #fff;
    }

    .button:hover {
      background: linear-gradient(45deg, #e42b66, #e2433f);
    }

    /* Syntax highlighting */
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #90a4ae;
    }
    .token.punctuation {
      color: #9e9e9e;
    }
    .namespace {
      opacity: 0.7;
    }
    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #e91e63;
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #4caf50;
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #795548;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: #3f51b5;
    }
    .token.function {
      color: #f44336;
    }
    .token.regex,
    .token.important,
    .token.variable {
      color: #ff9800;
    }
    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }
    .token.entity {
      cursor: help;
    }
  }
`;

export const CodeEditor = ({ value, onChange = () => {} }) => {
  const doHighlight = useCallback(code => highlight(code, languages.js), []);

  return (
    <Wrapper>
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={doHighlight}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </Wrapper>
  );
};

export default CodeEditor;
