import Color from 'color';

import fromPairs from 'lodash/fromPairs';
import once from 'lodash/once';

export interface DescribedColor {
  value: string;
  name?: string;
  isLight: boolean;
}

interface RawColor {
  value: string;
  name: string;
}

function initializeColors(rawData: RawColor[]): Record<string, DescribedColor> {
  return fromPairs(rawData.map(
    ({ value, ...others }) => [value, {
      ...others,
      value,
      isLight: Color(value).isLight(),
    }],
  ));
}

const rawBbsColors = [
  { value: "black", name: "黑色" },
  { value: "silver", name: "灰色" },
  { value: "red", name: "红色" },
  { value: "green", name: "绿色" },
  { value: "orange", name: "橘色" },
  { value: "purple", name: "紫色" },
  { value: "teal", name: "蓝绿" },
  { value: "fuchsia", name: "桃红" },
  { value: "yellow", name: "黄色" },
  { value: "beige", name: "米色" },
  { value: "brown", name: "棕色" },
  { value: "navy", name: "深蓝" },
  { value: "maroon", name: "紫红" },
  { value: "limegreen", name: "莱姆" },
  { value: "white", name: "白色" },
  { value: "brown", name: "棕色" },
  { value: "blue", name: "蓝色" },
  { value: "pink", name: "粉红" },
];

export const bbsColors = once(() => initializeColors(rawBbsColors));

const rawFreeColors = [
  { value: "black", name: "黑色" },
  { value: "silver", name: "银灰" },
  { value: "#634200", name: "深褐" },
  { value: "#e39700", name: "暗橙" },
  { value: "#d4e300", name: "金色" },
  { value: "#1ee300", name: "草绿" },
  { value: "#26067d", name: "靛色" },
  { value: "#c20cf0", name: "蓝紫" },
  { value: "#fc6d0d", name: "阳橙" },
  { value: "#0dfccc", name: "蓝绿" },
  { value: "#095157", name: "暗岩灰" },
  { value: "#8a0e1e", name: "暗红" },
  { value: "#e31717", name: "鲜红" },
  { value: "#1717e3", name: "蓝色" },
  { value: "#fc1956", name: "樱桃红" },
  { value: "#bd1c72", name: "品红" },
  { value: "#b06635", name: "锗黄" },
  { value: "#315723", name: "暗绿" },
  { value: "#bda855", name: "暗卡其" },
  { value: "#9a55bd", name: "中蓝紫" },
  { value: "#5ebd5e", name: "叶绿" },
  { value: "#65a8c9", name: "灰蓝" },
  { value: "#6b88d6", name: "矢车菊蓝" },
  { value: "#68bdac", name: "中碧蓝" },
  { value: "#575034", name: "咖啡" },
  { value: "#d68c81", name: "玫瑰褐" },
  { value: "#3d4057", name: "普鲁士蓝" },
  { value: "#bd84a2", name: "火鹤红" },
  { value: "#574141", name: "暗灰" },
  { value: "#ebf0d8", name: "米黄" },
  { value: "#eae3fc", name: "薰衣草紫" },
];

export const freeColors = once(() => initializeColors(rawFreeColors));
