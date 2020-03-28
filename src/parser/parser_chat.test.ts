import { parseChat } from './parser_chat';

describe('exported from log', () => {
  it("basic", () => {
    const text = `
消息记录（此消息记录为文本格式，不支持重新导入）

================================================================
消息分组:我的群聊
================================================================
消息对象:湖之仆从（PST 8pm | BJT 11am）
================================================================

2019-09-23 8:43:38 PM 骰娘-Roll100(87200175)
1

2019-09-23 8:43:38 PM 系统消息(10000)
[图片]2

2019-09-23 8:44:09 PM 系统消息(1000000)
3
4

2019-09-23 8:46:18 PM 暗夜(28084825)


2019-09-23 8:49:12 PM 系统消息(1000000)
真核生物独幕剧加入本群。

2019-09-23 9:02:42 PM 暗夜(28084825)
.r test

2019-09-23 11:26:00 PM 岁寒(36226407)
4

2019-09-24 7:54:29 AM 黄山真君(106505723)
5

2019-09-24 9:16:35 AM 黄山真君(106505723)
6
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("email", () => {
    const text = `
2020-03-04 12:12:29 AM 礼(852649)
1

2020-03-04 12:12:39 AM kp(100550)
2

2020-03-04 12:13:41 AM 围观<indo@qq.com>
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });
});

describe('copied from sidewindow', () => {
  it("basic", () => {
    const text = `
【冒泡】无情的围观熊 2/14/2020 9:16:13 PM
（1

【骰子】守善锤 2/14/2020 9:16:17 PM
2
3

你和abc有12个共同好友，点击添加好友。

【PL】克里斯托夫·韦恩 2/14/2020 9:17:10 PM
3

你撤回了一条消息

【PL】克里斯托夫·韦恩 2/14/2020 9:17:22 PM

守善锤撤回了一条消息

【PL】菲比斯·墨菲斯托 2/14/2020 9:17:31 PM
5
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("without title", () => {
    const text = `
无情的围观熊 2/14/2020 9:16:13 PM
（1

守善锤 2/14/2020 9:16:17 PM
2
3

你和abc有12个共同好友，点击添加好友。

克里斯托夫·韦恩 2/14/2020 9:17:10 PM
3

你撤回了一条消息

克里斯托夫·韦恩 2/14/2020 9:17:22 PM

守善锤撤回了一条消息

菲比斯·墨菲斯托 2/14/2020 9:17:31 PM
5
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("single date", () => {
    const text = `
【骰子】守善锤 3/4/2020 6:00:32 PM
1

【嘟嘟男爵】克里斯托夫·韦恩 3/4/2020 6:00:37 PM
2

【PL】薇薇安·汉密尔顿 3/4/2020 6:01:02 PM
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("other system messages", () => {
    const text = `
【骰子】守善锤 3/4/2020 6:00:32 PM
1

守善锤邀请123加入了本群。

猪突猛进加入本群。

【嘟嘟男爵】克里斯托夫·韦恩 3/4/2020 6:00:37 PM
2

【PL】薇薇安·汉密尔顿 3/4/2020 6:01:02 PM
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });
});

describe('copied from chat', () => {
  it("basic", () => {
    const text = `
【煤油】丧 丧 熊 9:59:54 PM
1

【煤油】丧 丧 熊 9:59:54 PM

守善锤撤回了一条消息

你和abc有12个共同好友，点击添加好友。

【八方体】Paul~K（写不完了...） 10:00:04 PM
2
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("without title", () => {
    const text = `
丧 丧 熊 9:59:54 PM
1

丧 丧 熊 9:59:54 PM

守善锤撤回了一条消息

你和abc有12个共同好友，点击添加好友。

Paul~K（写不完了...） 10:00:04 PM
2
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("instant withdraw", () => {
    const text = `
丧 丧 熊 9:59:54 PM
1

你撤回了一条消息 重新编辑

Paul~K（写不完了...） 10:00:04 PM
2
3
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });
});

xdescribe('copied from message manager', () => {
  it("basic", () => {
    const text = `
【1】织练取(958884) 3:13:28 AM
“——1。
【2】白菜<indo@qq.com> 3:14:30 AM
“我2”
"门3"
【2】白菜<indo@qq.com> 3:16:49 AM
嫌疑
是出
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });

  it("without title", () => {
    const text = `
织练取(958884) 3:13:28 AM
“——1。
白菜<indo@qq.com> 3:14:30 AM
“我2”
"门3"
白菜<indo@qq.com> 3:16:49 AM
嫌疑
是出
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });
});

describe('copied from mobile', () => {
  it("basic", () => {
    const text = `
— —  2020-2-21  — —

德里奇化石  23:50:12${" "}
1

a dark ideation  23:50:40${" "}
2

一零绵羊咩咩咩  23:50:48${" "}
诶？
    `;
    expect(
      parseChat(text)
    ).toMatchSnapshot();
  });
});