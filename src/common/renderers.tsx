import React from 'react';

import escapeHtml from 'escape-html';
import join from 'lodash/join';

export type RendererId =
    'standard-rich'
  | 'bold-rich'
  | 'standard-html'
  | 'bold-html'
  | 'standard-bbs'
  | 'bold-bbs'
  | 'tab-rich';

export interface RendereeLine {
  content: string[];
  playerName: string;
  playerColor: string;
}

interface RenderHandler {
  body?: (content: React.ReactNode) => React.ReactNode;
  line: (line: RendereeLine, key: number) => React.ReactNode;
}

export interface RenderingScheme {
  id: RendererId;
  name: string;
  description: string;
  allowNewPalette: boolean;
  previewRenderer: RenderHandler;
  finalRenderer: RenderHandler;
}

const standardLineRenderer = (leftDiv: string, rightDiv: string) => {
  function StandardLine(line: RendereeLine, key: number): React.ReactNode {
    return (
      <p
        key={key}
        style={{
          color: line.playerColor,
        }}
      >
        {`${leftDiv}${line.playerName}${rightDiv}`}
        {line.content.map((contentLine: string, contentId: number) => {
          const newLine = contentId === 0 ? [] : [<br key={`br-${contentId}`}/>];
          return newLine.concat([<span key={contentId}>{contentLine}</span>]);
        })}
      </p>
    );
  }
  return StandardLine;
};

const bbsFinalLineRenderer = (leftDiv: string, rightDiv: string) => {
  function BbsFinalLine(line: RendereeLine, key: number): React.ReactNode {
    return (
      <span
        key={key}
      >
        {`[color=${line.playerColor}]${leftDiv}${line.playerName}${rightDiv}`}
        {line.content.map((contentLine: string, contentId: number) => {
          const newLine = contentId === 0 ? [] : [<br key={`br-${contentId}`}/>];
          return newLine.concat([<span key={contentId}>{contentLine}</span>]);
        })}
        {`[/color]`}
        <br/>
      </span>
    );
  }
  return BbsFinalLine;
};

const htmlFinalLineRenderer = (leftDiv: string, rightDiv: string) => {
  function HtmlFinalLine(line: RendereeLine, key: number): React.ReactNode {
    return (
      <span
        key={key}
      > {[
          `<p style="color: ${line.playerColor}">`,
          escapeHtml(`${leftDiv}${line.playerName}${rightDiv}`),
          ...line.content.map((contentLine: string, contentId: number) => {
            const newLine = contentId === 0 ? [] : [<br key={`br-${contentId}`}/>];
            return newLine.concat([<span key={contentId}>{escapeHtml(contentLine)}</span>]);
          }),
          `</p>`,
        ]}
        <br/>
      </span>
    );
  }
  return HtmlFinalLine;
};

const schemeAngularBracketRich: RenderingScheme = {
  id: 'standard-rich',
  name: '富文本，尖括号分割',
  description: '最常见的格式。输出富文本，可直接复制粘贴到Word里。预览如下：',
  allowNewPalette: true,
  previewRenderer: { line: standardLineRenderer('<', '> ') },
  finalRenderer: { line: standardLineRenderer('<', '> ') },
};

const schemeBoldBracketRich: RenderingScheme = {
  id: 'bold-rich',
  name: '富文本，粗括号分割',
  description: '常见格式。输出富文本，可直接复制粘贴到Word里。预览如下：',
  allowNewPalette: true,
  previewRenderer: { line: standardLineRenderer('【', '】') },
  finalRenderer: { line: standardLineRenderer('【', '】') },
};

const schemeAngularBracketBbs: RenderingScheme = {
  id: 'standard-bbs',
  name: 'BBS代码，尖括号分割',
  description: '最常见的格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: false,
  previewRenderer: { line: standardLineRenderer('<', '> ') },
  finalRenderer: { line: bbsFinalLineRenderer('<', '> ') },
};

const schemeBoldBracketBbs: RenderingScheme = {
  id: 'bold-bbs',
  name: 'BBS代码，粗括号分割',
  description: '常见格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: false,
  previewRenderer: { line: standardLineRenderer('【', '】') },
  finalRenderer: { line: bbsFinalLineRenderer('【', '】') },
};

const schemeAngularBracketHtml: RenderingScheme = {
  id: 'standard-html',
  name: 'HTML，尖括号分割',
  description: '最常见的格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: true,
  previewRenderer: { line: standardLineRenderer('<', '> ') },
  finalRenderer: { line: htmlFinalLineRenderer('<', '> ') },
};

const schemeBoldBracketHtml: RenderingScheme = {
  id: 'bold-html',
  name: 'HTML，粗括号分割',
  description: '常见格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: true,
  previewRenderer: { line: standardLineRenderer('【', '】') },
  finalRenderer: { line: htmlFinalLineRenderer('【', '】') },
};

const schemeTabRich: RenderingScheme = {
  id: 'tab-rich',
  name: '【特殊】Tab分割',
  description: '以Tab分割各元素，保证垂直对齐的特殊格式。输出富文本，可直接复制粘贴到Word等软件中。大致效果预览如下（最终效果取决于文档设定）：',
  allowNewPalette: true,
  previewRenderer: {
    body: (content: React.ReactNode) => (
      <table className="tab-renderer-preview-table">
        {content}
      </table>
    ),
    line: (line: RendereeLine, key: number) => (
      <tr
        key={key}
        style={{
          color: line.playerColor,
        }}
      >
        <td>
          {line.playerName}
        </td>
        <td>
          {line.content.map((contentLine: string, contentId: number) => {
            const newLine = contentId === 0 ? [] : [<br key={`br-${contentId}`}/>];
            return newLine.concat([<span key={contentId}>{contentLine}</span>]);
          })}
        </td>
      </tr>
    ),
  },
  finalRenderer: {
    line: (line: RendereeLine, key: number) => (
      <pre
        key={key}
        style={{ color: line.playerColor }}
        dangerouslySetInnerHTML={{
          __html: `&#9;${escapeHtml(line.playerName)}&#9;${join(line.content.map(escapeHtml), '&#11;')}`
        }}
      />
    ),
  },
};

export const renderingSchemes: Record<RendererId, RenderingScheme> = {
  'standard-rich': schemeAngularBracketRich,
  'bold-rich': schemeBoldBracketRich,
  'standard-bbs': schemeAngularBracketBbs,
  'bold-bbs': schemeBoldBracketBbs,
  'standard-html': schemeAngularBracketHtml,
  'bold-html': schemeBoldBracketHtml,
  'tab-rich': schemeTabRich,
};

export function renderContent(lines: RendereeLine[], scheme: RenderingScheme, preview: boolean) : React.ReactNode {
  const renderer = preview ? scheme.previewRenderer : scheme.finalRenderer;
  const body = lines.map(renderer.line);
  if (renderer.body != null) {
    return renderer.body(body);
  }
  return body;
}
