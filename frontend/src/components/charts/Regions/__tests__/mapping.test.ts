test("test merging of arrays", () => {
  let test = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 5],
    [2, 3],
    [2, 5],
  ];

  let foo = test.reduce((prev, curr, index, arr) => {
    console.log(prev, curr, index, arr);
  }, []);

  console.log(foo);
  expect(1).toEqual(1);
});
