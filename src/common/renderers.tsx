import React, { ReactNode } from 'react';

import escapeHtml from 'escape-html';
import join from 'lodash/join';
import uniqBy from 'lodash/uniqBy';
import { deriveRenpyNames } from './derive-renpy-names';

export type RendererId =
    'standard-rich'
  | 'bold-rich'
  | 'standard-html'
  | 'bold-html'
  | 'standard-bbs'
  | 'bold-bbs'
  | 'tab-rich'
  | 'renpy';

export interface RendereeLine {
  content: string[];
  playerName: string;
  playerColor: string;
}

type RenderHandler = (lines: RendereeLine[]) => React.ReactNode;
export interface RenderingScheme {
  id: RendererId;
  name: string;
  description: string;
  allowNewPalette: boolean;
  previewRenderer: RenderHandler;
  finalRenderer: RenderHandler;
}

const standardLineRenderer = (leftDiv: string, rightDiv: string) => {
  function StandardLine(lines: RendereeLine[]): React.ReactNode {
    return lines.map((line: RendereeLine, key: number) => (
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
    ));
  }
  return StandardLine;
};

const bbsFinalLineRenderer = (leftDiv: string, rightDiv: string) => {
  function BbsFinalLine(lines: RendereeLine[]): React.ReactNode {
    return lines.map((line: RendereeLine, key: number) => (
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
    ));
  }
  return BbsFinalLine;
};

const htmlFinalLineRenderer = (leftDiv: string, rightDiv: string) => {
  function HtmlFinalLine(lines: RendereeLine[]): React.ReactNode {
    return lines.map((line: RendereeLine, key: number) => (
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
    ));
  }
  return HtmlFinalLine;
};

const schemeAngularBracketRich: RenderingScheme = {
  id: 'standard-rich',
  name: '富文本，尖括号分割',
  description: '最常见的格式。输出富文本，可直接复制粘贴到Word里。预览如下：',
  allowNewPalette: true,
  previewRenderer: standardLineRenderer('<', '> '),
  finalRenderer: standardLineRenderer('<', '> '),
};

const schemeBoldBracketRich: RenderingScheme = {
  id: 'bold-rich',
  name: '富文本，粗括号分割',
  description: '常见格式。输出富文本，可直接复制粘贴到Word里。预览如下：',
  allowNewPalette: true,
  previewRenderer: standardLineRenderer('【', '】'),
  finalRenderer: standardLineRenderer('【', '】'),
};

const schemeAngularBracketBbs: RenderingScheme = {
  id: 'standard-bbs',
  name: 'BBS代码，尖括号分割',
  description: '最常见的格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: false,
  previewRenderer: standardLineRenderer('<', '> '),
  finalRenderer: bbsFinalLineRenderer('<', '> '),
};

const schemeBoldBracketBbs: RenderingScheme = {
  id: 'bold-bbs',
  name: 'BBS代码，粗括号分割',
  description: '常见格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: false,
  previewRenderer: standardLineRenderer('【', '】'),
  finalRenderer: bbsFinalLineRenderer('【', '】'),
};

const schemeAngularBracketHtml: RenderingScheme = {
  id: 'standard-html',
  name: 'HTML，尖括号分割',
  description: '最常见的格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: true,
  previewRenderer: standardLineRenderer('<', '> '),
  finalRenderer: htmlFinalLineRenderer('<', '> '),
};

const schemeBoldBracketHtml: RenderingScheme = {
  id: 'bold-html',
  name: 'HTML，粗括号分割',
  description: '常见格式。输出BBS代码，可复制粘贴到果园。最终效果预览如下：',
  allowNewPalette: true,
  previewRenderer: standardLineRenderer('【', '】'),
  finalRenderer: htmlFinalLineRenderer('【', '】'),
};

const schemeTabRich: RenderingScheme = {
  id: 'tab-rich',
  name: '【特殊】Tab分割',
  description: '以Tab分割各元素，保证垂直对齐的特殊格式。输出富文本，可直接复制粘贴到Word等软件中。大致效果预览如下（最终效果取决于文档设定）：',
  allowNewPalette: true,
  previewRenderer: (lines: RendereeLine[]): React.ReactNode => {
    const renderedLines = lines.map((line: RendereeLine, key: number) => (
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
    ));
    return (
      <table className="tab-renderer-preview-table">
        {renderedLines}
      </table>
    );
  },
  finalRenderer: (lines: RendereeLine[]): React.ReactNode => {
    return lines.map((line: RendereeLine, key: number) => (
      <pre
        key={key}
        style={{ color: line.playerColor }}
        dangerouslySetInnerHTML={{
          __html: `&#9;${escapeHtml(line.playerName)}&#9;${join(line.content.map(escapeHtml), '&#11;')}`
        }}
      />
    ));
  },
};

function escapeString(s: string): string {
  return s.replaceAll(/[\\"]/g, (s: string) => `\\${s}`);
}

function interlaceNewline(lines: ReactNode[], newlines: number, start: number): ReactNode {
  const result: ReactNode[] = [];
  lines.forEach((line: ReactNode, index: number) => {
    if (index !== 0) {
      for (let i = 0; i < newlines; i++)
        result.push(<br key={start + index * newlines + i} />);
    }
    result.push(line);
  });
  return result;
}

function renpyRenderer(lines: RendereeLine[]): React.ReactNode {
  const profiles = uniqBy(lines, (line: RendereeLine) => line.playerName);
  const renpyNames = deriveRenpyNames(profiles.map((profile: RendereeLine) => profile.playerName));
  const nameMap: Record<string, string> = {};
  renpyNames.forEach((renpyName: string, index: number) => {
    nameMap[profiles[index].playerName] = renpyName;
  });

  const header = profiles.map((line: RendereeLine, index: number) => {
    return `define ${renpyNames[index]} = Character('${escapeString(line.playerName)}', color="${line.playerColor}")`;
  });
  const contents = lines.map((line: RendereeLine) => {
    const renpyName = nameMap[line.playerName];
    const body = line.content.map((contentLine: string) => {
      return escapeString(contentLine);
    }).join('" +\\n    "');
    return `    ${renpyName} "${body}"`;
  });
  return (
    <pre>
      {interlaceNewline(header, 1, 0)}
      <br key={header.length} />
      <br key={header.length + 1} />
      label start:
      <br key={header.length + 2} />
      {interlaceNewline(contents, 2, header.length + 3)}
    </pre>
  );
}

const schemeRenpy: RenderingScheme = {
  id: 'renpy',
  name: '【特殊】Renpy',
  description: '输出可以直接导入进Renpy的格式：',
  allowNewPalette: true,
  previewRenderer: renpyRenderer,
  finalRenderer: renpyRenderer,
};


export const renderingSchemes: Record<RendererId, RenderingScheme> = {
  'standard-rich': schemeAngularBracketRich,
  'bold-rich': schemeBoldBracketRich,
  'standard-bbs': schemeAngularBracketBbs,
  'bold-bbs': schemeBoldBracketBbs,
  'standard-html': schemeAngularBracketHtml,
  'bold-html': schemeBoldBracketHtml,
  'tab-rich': schemeTabRich,
  'renpy': schemeRenpy,
};

export function renderContent(lines: RendereeLine[], scheme: RenderingScheme, preview: boolean) : React.ReactNode {
  const renderer = preview ? scheme.previewRenderer : scheme.finalRenderer;
  return renderer(lines);
}
