import {
  arrIntersection,
  getOutput,
  getStudentPairs,
  groupSubjectsByStudentIds,
  StudentIdsPairInArray,
  StudentIdSubjectPair,
} from "../script";

describe("Result:", () => {
  const input: Array<StudentIdSubjectPair> = [
    ["1", "Economics"],
    ["1", "Software development"],
    ["4", "Science"],
    ["5", "Software development"],
    ["5", "Economics"],
    ["5", "Mathematics"],
    ["6", "Software development"],
    ["6", "Science"],
    ["6", "Economics"],
  ];
  const studentsSubjectsDict = {
    "1": ["Economics", "Software development"],
    "4": ["Science"],
    "5": ["Software development", "Economics", "Mathematics"],
    "6": ["Software development", "Science", "Economics"],
  };
  const arrayByStudentsPair: StudentIdsPairInArray = [
    ["1", "4"],
    ["1", "5"],
    ["1", "6"],
    ["4", "5"],
    ["4", "6"],
    ["5", "6"],
  ];
  const output = {
    "1,4": [],
    "1,5": ["Economics", "Software development"],
    "1,6": ["Economics", "Software development"],
    "4,5": [],
    "4,6": ["Science"],
    "5,6": ["Software development", "Economics"],
  };
  test("groupSubjectsByStudentIds", () => {
    expect(groupSubjectsByStudentIds(input)).toStrictEqual(
      studentsSubjectsDict
    );
  });
  test("getStudentPairs", () => {
    expect(getStudentPairs(Object.keys(studentsSubjectsDict))).toStrictEqual(
      arrayByStudentsPair
    );
  });
  test("getOutput", () => {
    expect(getOutput(studentsSubjectsDict, arrayByStudentsPair)).toStrictEqual(
      output
    );
  });
  describe("Array intersections", () => {
    [
      {
        arrA: [1, 2, 3],
        arrB: [2, 3, 4],
        expected: [2, 3],
      },
    ].forEach(({ arrA, arrB, expected }) => {
      it(`ArrA: ${JSON.stringify(arrA)}, ArrB: ${JSON.stringify(arrB)}, 
                Expected ${JSON.stringify(expected)}`, () => {
        expect(arrIntersection(arrA, arrB)).toStrictEqual(expected);
      });
    });
  });
});
