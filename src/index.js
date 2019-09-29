const mathOperators = {
  "*": (a, b) => {
    return a * b;
  },
  "/": (a, b) => {
    return a / b;
  },
  "+": (a, b) => {
    return a + b;
  },
  "-": (a, b) => {
    return a - b;
  }
};

function mathWithoutBrackets(array) {
  let i = 0;
  const newArray = [...array];

  if (newArray.includes("*") && newArray.includes("/")) {

    if (newArray.indexOf("*") < newArray.indexOf("/")) {

      i = newArray.indexOf("*");

      newArray.splice(
          i - 1,
          3,
          mathOperators["*"](+newArray[i - 1], +newArray[i + 1])
      );

      return mathWithoutBrackets(newArray);
    }
    if (newArray.indexOf("/") < newArray.indexOf("*")) {

      i = newArray.indexOf("/");

      newArray.splice(
          i - 1,
          3,
          mathOperators["/"](+newArray[i - 1], +newArray[i + 1])
      );
      return mathWithoutBrackets(newArray);
    }
  } else {
    if (newArray.includes("*")) {

      i = newArray.indexOf("*");

      newArray.splice(
          i - 1,
          3,
          mathOperators["*"](+newArray[i - 1], +newArray[i + 1])
      );
      return mathWithoutBrackets(newArray);

    } else if (newArray.includes("/")) {

      i = newArray.indexOf("/");

      newArray.splice(
          i - 1,
          3,
          mathOperators["/"](+newArray[i - 1], +newArray[i + 1])
      );
      return mathWithoutBrackets(newArray);

    } else if (newArray.length > 1) {
      for (let j = 0; j <= newArray.length;) {

        if (newArray[j] === "+") {

          newArray.splice(
              j - 1,
              3,
              mathOperators["+"](+newArray[j - 1], +newArray[j + 1])
          );

          j = 0;

        } else if (newArray[j] === "-") {

          newArray.splice(
              j - 1,
              3,
              mathOperators["-"](+newArray[j - 1], +newArray[j + 1])
          );

          j = 0;

        } else {

          j++;

        }
      }
    }
  }
  if (newArray[0] === Infinity) {

    throw new Error("TypeError: Devision by zero.");

  }
  return newArray[0];
}

function mathWithBrackets(array) {
  const newArray = [array];

  function fooMathWithNestedBrackets(arr) {

    const bracketsArray = arr.slice(arr.lastIndexOf("(") + 1);
    const nestedBracketsArray = bracketsArray.slice(0, bracketsArray.indexOf(")"));
    const result = mathWithoutBrackets(nestedBracketsArray);

    arr.splice(

        arr.lastIndexOf("("),
        nestedBracketsArray.length + 2,
        String(result)

    );

    if (arr.includes("(") && arr.includes(")")) {
      return fooMathWithNestedBrackets(arr);
    } else {
      return +Number(mathWithoutBrackets(arr)).toFixed(4);
    }
  }

  return fooMathWithNestedBrackets(newArray);
}

function expressionCalculator(expr) {

  const exprArray =
      expr.length > 3
          ? expr.split(" ").filter(el => el !== "")
          : expr.split("").filter(el => el !== "");

  let openBracketCount = 0;
  let closeBracketCount = 0;

  if (expr.includes("(") || expr.includes(")")) {

    const arr = expr.split("");
    openBracketCount = arr.filter(el => el === "(").length;
    closeBracketCount = arr.filter(el => el === ")").length;

    if (openBracketCount === closeBracketCount) {
      return mathWithBrackets(exprArray);
    } else {
      throw new Error("ExpressionError: Brackets must be paired");
    }

  } else {
    return +Number(mathWithoutBrackets(exprArray)).toFixed(4);
  }
}

module.exports = {
  expressionCalculator
};
