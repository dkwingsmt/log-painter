import { parseChat } from './parser_chat';

it("header1-basic", () => {
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

it("header2-basic", () => {
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

it("header2-without title", () => {
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

it("header3-basic", () => {
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

it("header3-without title", () => {
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

it("header3-instant withdraw", () => {
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

it("header4-basic", () => {
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