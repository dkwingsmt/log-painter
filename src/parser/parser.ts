import foreach from 'lodash/foreach';
import values from 'lodash/values';

interface Player {
  name: string;
  colorIndex: number;
}

interface LogLine {
  time: string;
  player: Player;
  content: string;
}

interface ParseOptions {
  commandFilter: boolean;
  otherFilter: boolean;
  picTextFilter: boolean;
  timeSwitch: boolean;
  nnameSwitch: boolean;
}

interface ParseResult {
  players: Player[];
  logs: LogLine[];
}

export function parseChat(data: string, options: ParseOptions): ParseResult {
  const regHeader =
    /\d{4}-\d{2}-\d{2} (\d{1,2}:\d{2}:\d{2}) (AM|PM)? ?([^\(]*)/; // 2016-01-03 \d{2}:\d{2}:\d{2}/g name
  const regHeader2 = /(.*?)(\([0-9]+\))? +(\d{1,2}:\d{2}:\d{2}).*/; // \d{2}:\d{2}:\d{2}/
  const regDiscard =
    /^([\.。!！][rR]|[/\.、。!！][mM][eE]|[\.。!！][hH][eE][lL][pP]|[\.。!！][lL][oO][gG]|[\.。!！][wW]|[\.。!！][sS][cC]|[\.。!！][eE][nN]|[\.。!！][sS][eE][tT]|[\.。!！][sS][tT]|[\.。!！][cC][oO][cC]|[\.。!！][dD][nN][dD]|[\.。!！][tTlL][iI]|[\.。!！][jJ][rR][rR][pP]|[\.。!！][rR][uU][lL][eE][sS]|[\.。!！][nN]|[\.。!！][bB][oO][tT]|[\.。!！][oO][bB]|[\.。!！][wW][eE][lL][cC][oO][mM][eE]).*/;
  const regOther = /^(\(|（).*/;
  const regPicText = /\[图片\]/;

  const nameList: Record<string, Player> = {};
  const logList: LogLine[] = [];

  let colorIndex = 0;

  function ensureAddlayer(name: string): void {
    if (!(name in nameList)) {
      nameList[name] = { name, colorIndex: colorIndex };
      colorIndex++;
    }
  }

  let name = "";
  let time = "";

  foreach(data.split("\n"), (line) => {
    if (line.length == 0) {
      return;
    }
    // Recognize message header
    const res = line.match(regHeader);
    const res2 = line.match(regHeader2);

    // Deal with new name

    if (res != null || res2 != null) {
      if (res != null) {
        name = res[3].trim();
        time = res[1];
      } else if (res2 != null) {
        name = res2[1].trim();
        time = res2[3];
      }
      //----------------NEW NAME
      if (options.nnameSwitch && name.indexOf('【') == 0 && name.indexOf('】') != -1) {
        name = name.substr(name.indexOf('】') + 1);
      }
      //----------------------------------------------
      if (name != "" && name != "系统消息") {
        ensureAddlayer(name);
      }

    } else {
      const player: Player | undefined = nameList[name];
      if (player == null) {
        return;
      }

      //Deal with message content
      if (options.commandFilter) {
        const discard = line.match(regDiscard);
        if (discard != null) {
          return;
        }
      }

      if (options.otherFilter) {
        const other = line.match(regOther);
        if (other != null) {
          return;
        }
      }

      let editedLine = line;
      if (options.picTextFilter) {
        editedLine = line.replace(regPicText, "");
        if (line.length == 0) {
          return;
        }
      }

      //Fix time length to 8
      if (time.length != 8) {
        time = ' ' + time;
      }

      const log: LogLine = { time, player, content: editedLine };
      logList[logList.length] = log;
    }
  });

  return { players: values(nameList), logs: logList };
}