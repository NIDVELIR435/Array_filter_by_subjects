const input: Array<StudentIdSubjectPair> = [
  ["1", "Economics"],
  ["1", "Software development"],
  ["2", "Science"],
  ["3", "Software development"],
  ["4", "Science"],
  ["5", "Software development"],
  ["5", "Economics"],
  ["5", "Mathematics"],
];
type StudentId = string;
type Subject = string;
export type StudentIdSubjectPair = [studentId: StudentId, subject: Subject];
type StudentIdsPair = [studentA: StudentId, studentB: StudentId];
export type StudentIdsPairInArray = Array<[StudentId, StudentId]>;
export type StudentsSubjectsDict = Record<StudentId, Array<Subject>>;
type StudentIdPairKey = `${StudentId},${StudentId}`;
type Output = Record<StudentIdPairKey, Array<Subject>>;

export const groupSubjectsByStudentIds = (
  studentSubjectPairs: Array<StudentIdSubjectPair>
): StudentsSubjectsDict =>
  studentSubjectPairs.reduce((dict, [studentId, subject]) => {
    if (!dict[studentId]) dict[studentId] = [];
    dict[studentId].push(subject);
    return dict;
  }, {} as StudentsSubjectsDict);

export const getStudentPairs = (
  list: Array<StudentId>
): Array<StudentIdsPair> =>
  list
    .map((item, i) =>
      list.slice(i + 1).map((subItem) => [item, subItem] as StudentIdsPair)
    )
    .flat();

export const renderOutputKey = (
  studentIdA: StudentId,
  studentIdB: StudentId
): StudentIdPairKey => `${studentIdA},${studentIdB}` as StudentIdPairKey;

export const getOutput = (
  objectByStudentsSubjects: StudentsSubjectsDict,
  arrayByStudentsPair: StudentIdsPairInArray
): Output =>
  arrayByStudentsPair.reduce((dict, [sIdA, sIdB]) => {
    dict[renderOutputKey(sIdA, sIdB)] = arrIntersection(
      objectByStudentsSubjects[sIdA],
      objectByStudentsSubjects[sIdB]
    );
    return dict;
  }, {} as Output);

export const arrIntersection = <T>(
  arrA: Array<T>,
  arrB: Array<T>
): Array<T> => {
  let seatedArrB = new Set(arrB);
  return arrA.filter((item) => seatedArrB.has(item)); //optimized after method includes.
};

const main = () => {
  const studentsSubjectsDict = groupSubjectsByStudentIds(input);
  const arrayByStudentsPair = getStudentPairs(
    Object.keys(studentsSubjectsDict)
  );
  const output = getOutput(studentsSubjectsDict, arrayByStudentsPair);
  console.log(studentsSubjectsDict);
  console.log(arrayByStudentsPair);
  console.log(output);
};
main();
