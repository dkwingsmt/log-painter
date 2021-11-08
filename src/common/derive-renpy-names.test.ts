import { deriveRenpyNames } from "./derive-renpy-names";

describe('deriveRenpyNames', () => {
  it("success", () => {
    expect(deriveRenpyNames(['a', 'b']))
    .toEqual(['a', 'b']);
  });

  it("filter", () => {
    expect(deriveRenpyNames(['a1', '1a']))
    .toEqual(['a1', 'a']);
  });

  it("failure", () => {
    expect(deriveRenpyNames(['a', '1a']))
    .toEqual(['_C2', '_C1']);
  });

  it("longer failure", () => {
    expect(deriveRenpyNames(['a', 'bbb3', 'bbb4', 'bc']))
    .toEqual(['a', 'bbb3', 'bbb4', 'bc']);
  });

  it("keywords", () => {
    expect(deriveRenpyNames(['_i', '_in', '_in1', '_in12']))
    .toEqual(['i', '_C1', 'in1', 'in12']);
  });

  it("Complete duplicate", () => {
    expect(deriveRenpyNames(['a', 'a']))
    .toEqual(['a', 'a1']);
  });

  it("Chinese", () => {
    expect(deriveRenpyNames(['张三', '李·四']))
    .toEqual(['张', '李']);
  });

  it("Chinese2", () => {
    expect(deriveRenpyNames(['余灰', 'Q', '余灰']))
    .toEqual(['张', '李']);
  });

  it("spaces", () => {
    expect(deriveRenpyNames(['                                  ']))
    .toEqual(['_C1']);
  });
});
