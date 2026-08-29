# 11주차 · 구조체와 공용체(1)

지금까지 변수 하나에는 보통 값 하나를 저장했습니다.

```c
int age = 20;
double score = 92.5;
```

그런데 실제 프로그램에서는 <strong>서로 관련된 여러 값을 한 묶음으로 다루고 싶은 경우</strong>가 많습니다.

예를 들어 학생 한 명에게는 이름, 나이, 점수가 모두 있습니다.

이번 시간에는 이런 여러 정보를 하나로 묶는 <strong>구조체(structure)</strong>를 배웁니다.

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 구조체가 왜 필요한지
2. `struct`를 이용해 새로운 자료 묶음을 만드는 방법
3. 구조체 변수를 선언하고 초기화하는 방법
4. 점 연산자 `.`로 멤버에 접근하는 방법
5. 구조체 배열로 여러 사람의 정보를 저장하는 방법
6. 구조체를 함수에 전달하면 기본적으로 복사된다는 점
7. 구조체 안에 다른 구조체를 넣을 수 있다는 점
:::

---

## 1. 학생 한 명의 정보를 저장해 봅시다

학생 한 명의 이름, 나이, 점수를 저장한다고 해 봅시다.

```c
char name[20] = "민수";
int age = 20;
double score = 92.5;
```

이 정도는 어렵지 않습니다.

그런데 학생이 100명이라면 어떨까요?

```text
name1, age1, score1
name2, age2, score2
name3, age3, score3
...
```

변수가 너무 많아지고 어떤 값들이 한 사람의 정보인지 관리하기 어려워집니다.

그래서 C언어에는 <strong>관련된 여러 값을 한 묶음으로 만드는 기능</strong>이 있습니다.

그것이 구조체입니다.

![서로 다른 정보를 하나로 묶는 구조체](/images/week11/struct-bundle.svg)

<div class="big-check">
<strong>구조체 = 서로 관련된 여러 값을 하나의 자료 묶음으로 만드는 기능</strong>
</div>

---

## 2. 배열과 구조체는 무엇이 다른가요?

8주차에서 배열을 배웠습니다.

```c
int scores[3] = {90, 80, 95};
```

배열은 같은 자료형을 여러 개 저장할 때 편리합니다.

하지만 학생 정보는 자료형이 서로 다릅니다.

```text
이름   → 문자 배열
나이   → int
점수   → double
```

이럴 때 구조체를 사용합니다.

| 구분 | 배열 | 구조체 |
| --- | --- | --- |
| 주된 목적 | 같은 종류의 값 여러 개 | 서로 관련된 여러 종류의 값 |
| 예 | 점수 5개 | 학생의 이름+나이+점수 |
| 접근 | `arr[0]` | `student.age` |

---

## 3. 가장 기본적인 구조체를 만들어 봅시다

구조체를 만드는 기본 모양입니다.

```c
struct Student
{
    char name[20];
    int age;
    double score;
};
```

천천히 나누어 보겠습니다.

```c
struct Student
```

`Student`라는 이름의 구조체 형태를 만들겠다는 뜻입니다.

중괄호 안에는 이 구조체가 가질 항목을 적습니다.

```c
char name[20];
int age;
double score;
```

이 각각의 항목을 <strong>멤버(member)</strong>라고 부릅니다.

::: info 용어는 이렇게 생각하세요
`Student` = 학생 정보 묶음의 설계도

`name`, `age`, `score` = 그 묶음 안에 들어가는 항목(멤버)
:::

---

## 4. 구조체 정의 뒤의 세미콜론을 잊지 마세요

구조체 정의의 끝에는 세미콜론 `;`이 있습니다.

```c
struct Student
{
    char name[20];
    int age;
    double score;
};   // 여기에 ; 필요
```

초보자가 자주 빠뜨리는 부분입니다.

잘못된 예:

```c
struct Student
{
    int age;
}   // ; 없음
```

올바른 예:

```c
struct Student
{
    int age;
};
```

---

## 5. 구조체 설계도만 만들면 아직 학생은 없습니다

다음 코드는 `Student`라는 모양만 정의한 것입니다.

```c
struct Student
{
    char name[20];
    int age;
    double score;
};
```

실제 데이터를 저장하려면 구조체 변수를 하나 만들어야 합니다.

```c
struct Student student;
```

일반 변수를 만들 때:

```c
int age;
```

라고 했던 것과 비슷합니다.

구조체에서는 자료형 자리에:

```c
struct Student
```

가 들어갑니다.

---

## 6. 구조체 안의 값은 점 `.`으로 선택합니다

구조체 변수 `student`가 있다고 합시다.

```c
struct Student student;
```

나이를 사용하려면:

```c
student.age
```

라고 적습니다.

점 `.`을 <strong>멤버 접근 연산자</strong>라고 부릅니다.

![점 연산자로 구조체 멤버 선택하기](/images/week11/member-dot.svg)

쉽게 읽으면:

```text
student.age
학생 묶음 안의 age
```

입니다.

---

## 7. 숫자 멤버에 값을 넣어 봅시다

```c
#include <stdio.h>

struct Student
{
    int age;
    double score;
};

int main(void)
{
    struct Student student;

    student.age = 20;
    student.score = 92.5;

    printf("나이: %d\n", student.age);
    printf("점수: %.1f\n", student.score);

    return 0;
}
```

실행 결과:

```text
나이: 20
점수: 92.5
```

---

## 8. 문자 배열 멤버는 대입이 조금 다릅니다

구조체 안에 이름을 문자 배열로 만들었다고 합시다.

```c
char name[20];
```

다음처럼 실행 중에 문자열을 바로 대입할 수는 없습니다.

```c
student.name = "민수";   // 잘못된 코드
```

문자 배열에 문자열을 복사할 때는 `strcpy` 계열 함수를 사용할 수 있습니다.

Visual Studio에서는 안전 함수인 `strcpy_s()`를 사용해 봅시다.

```c
#include <stdio.h>
#include <string.h>

struct Student
{
    char name[20];
    int age;
};

int main(void)
{
    struct Student student;

    strcpy_s(student.name, sizeof(student.name), "민수");
    student.age = 20;

    printf("이름: %s\n", student.name);
    printf("나이: %d\n", student.age);

    return 0;
}
```

::: info 지금은 이렇게 이해하면 충분합니다
문자 배열은 숫자 변수처럼 `=` 한 번으로 문자열 전체를 복사할 수 없습니다.

문자열 함수는 뒤에서 다시 더 자세히 만나게 됩니다.
:::

---

## 9. 구조체를 만들면서 바로 초기화할 수 있습니다

다음처럼 구조체 변수를 만들 때 값을 순서대로 넣을 수 있습니다.

```c
struct Student student = {"민수", 20, 92.5};
```

전체 프로그램입니다.

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
    double score;
};

int main(void)
{
    struct Student student = {"민수", 20, 92.5};

    printf("이름: %s\n", student.name);
    printf("나이: %d\n", student.age);
    printf("점수: %.1f\n", student.score);

    return 0;
}
```

---

## 10. 초기화 값의 순서는 구조체 정의 순서와 같습니다

구조체를 다음처럼 만들었다면:

```c
struct Student
{
    char name[20];
    int age;
    double score;
};
```

초기화도 같은 순서입니다.

```c
struct Student student = {"민수", 20, 92.5};
```

즉:

```text
"민수" → name
20      → age
92.5    → score
```

입니다.

순서를 바꾸면 엉뚱한 값이 들어가거나 컴파일 경고/오류가 발생할 수 있습니다.

---

## 11. 멤버를 지정해서 초기화할 수도 있습니다

C에서는 다음처럼 멤버 이름을 직접 적는 방식도 있습니다.

```c
struct Student student = {
    .age = 20,
    .score = 92.5,
    .name = "민수"
};
```

이 방법은 순서를 헷갈릴 가능성이 줄어듭니다.

다만 처음에는 앞에서 배운 순서 초기화부터 익숙해져도 충분합니다.

---

## 12. 구조체 변수도 여러 개 만들 수 있습니다

```c
struct Student s1 = {"민수", 20, 90.0};
struct Student s2 = {"영희", 21, 95.0};
```

사용할 때는 각각 점 연산자로 접근합니다.

```c
printf("%s %d %.1f\n", s1.name, s1.age, s1.score);
printf("%s %d %.1f\n", s2.name, s2.age, s2.score);
```

하지만 학생이 100명이라면 변수 100개를 만드는 것도 불편합니다.

그래서 배열과 구조체를 함께 사용합니다.

---

## 13. 구조체 배열을 만들어 봅시다

```c
struct Student students[3];
```

이것은 `Student` 구조체를 3개 저장하는 배열입니다.

![구조체 배열의 모습](/images/week11/struct-array.svg)

8주차의 일반 배열과 같은 방식으로 번호를 사용합니다.

```text
students[0]
students[1]
students[2]
```

각 칸 안에는 구조체 하나가 들어 있습니다.

---

## 14. 구조체 배열의 멤버에 접근하기

첫 번째 학생의 나이:

```c
students[0].age
```

두 번째 학생의 점수:

```c
students[1].score
```

세 번째 학생의 이름:

```c
students[2].name
```

읽는 순서는 왼쪽부터 보면 됩니다.

```text
students[1].score
     ↓       ↓
두 번째 학생  그 학생의 점수
```

---

## 15. 구조체 배열을 한 번에 초기화해 봅시다

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
    double score;
};

int main(void)
{
    struct Student students[3] = {
        {"민수", 20, 90.0},
        {"영희", 21, 95.0},
        {"철수", 19, 88.0}
    };

    printf("%s %.1f\n", students[0].name, students[0].score);
    printf("%s %.1f\n", students[1].name, students[1].score);
    printf("%s %.1f\n", students[2].name, students[2].score);

    return 0;
}
```

---

## 16. 반복문으로 구조체 배열 출력하기

구조체 배열도 배열이므로 `for`문과 아주 잘 어울립니다.

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
    double score;
};

int main(void)
{
    struct Student students[3] = {
        {"민수", 20, 90.0},
        {"영희", 21, 95.0},
        {"철수", 19, 88.0}
    };

    for (int i = 0; i < 3; i++)
    {
        printf("%s / %d세 / %.1f점\n",
               students[i].name,
               students[i].age,
               students[i].score);
    }

    return 0;
}
```

실행 결과:

```text
민수 / 20세 / 90.0점
영희 / 21세 / 95.0점
철수 / 19세 / 88.0점
```

---

## 17. 구조체 배열에서 평균 점수 구하기

```c
#include <stdio.h>

struct Student
{
    char name[20];
    double score;
};

int main(void)
{
    struct Student students[3] = {
        {"민수", 90.0},
        {"영희", 95.0},
        {"철수", 85.0}
    };

    double sum = 0.0;

    for (int i = 0; i < 3; i++)
    {
        sum += students[i].score;
    }

    printf("평균: %.1f\n", sum / 3);

    return 0;
}
```

배열에서 했던 합계/평균 계산과 똑같습니다.

차이는 원소 하나가 단순 정수가 아니라 구조체라는 점입니다.

---

## 18. 구조체를 함수에 전달할 수도 있습니다

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
};

void printStudent(struct Student s)
{
    printf("이름: %s\n", s.name);
    printf("나이: %d\n", s.age);
}

int main(void)
{
    struct Student student = {"민수", 20};

    printStudent(student);

    return 0;
}
```

함수의 매개변수에도 구조체 자료형을 사용할 수 있습니다.

```c
void printStudent(struct Student s)
```

---

## 19. 구조체를 값으로 전달하면 복사됩니다

7주차에서 일반 변수를 함수에 전달하면 값이 복사된다고 배웠습니다.

구조체도 기본적으로 같습니다.

![구조체를 함수에 전달할 때의 복사](/images/week11/struct-function-copy.svg)

다음 코드를 봅시다.

```c
#include <stdio.h>

struct Student
{
    int age;
};

void changeAge(struct Student s)
{
    s.age = 100;
    printf("함수 안: %d\n", s.age);
}

int main(void)
{
    struct Student student = {20};

    changeAge(student);

    printf("main: %d\n", student.age);

    return 0;
}
```

실행 결과:

```text
함수 안: 100
main: 20
```

함수의 `s`는 복사본이므로 원래 `student`는 바뀌지 않았습니다.

---

## 20. 원본 구조체를 함수에서 바꾸려면 어떻게 할까요?

지난 시간에 포인터를 배웠으므로 눈치챘을 수도 있습니다.

원본을 바꾸려면 구조체의 주소를 전달할 수 있습니다.

다만 이때는 점 `.`이 아니라 새로운 연산자 `->`가 등장합니다.

```c
void changeAge(struct Student *p)
{
    p->age = 100;
}
```

이 부분은 <strong>12주차에서 구조체 포인터와 함께 자세히</strong> 배웁니다.

지금은:

```text
구조체 자체 전달 → 복사본
구조체 주소 전달 → 원본에 접근 가능
```

정도만 기억하세요.

---

## 21. 구조체 안에 구조체를 넣을 수도 있습니다

학생의 생년월일을 저장한다고 해 봅시다.

먼저 날짜 구조체를 만듭니다.

```c
struct Date
{
    int year;
    int month;
    int day;
};
```

그리고 `Student` 안에 넣을 수 있습니다.

```c
struct Student
{
    char name[20];
    double score;
    struct Date birth;
};
```

![구조체 안에 다른 구조체 넣기](/images/week11/nested-struct.svg)

이런 형태를 <strong>중첩 구조체</strong>라고 생각할 수 있습니다.

---

## 22. 중첩 구조체의 멤버에 접근하기

```c
struct Student student = {
    "민수",
    90.0,
    {2005, 3, 15}
};
```

출생 연도는 이렇게 접근합니다.

```c
student.birth.year
```

읽어 보면:

```text
student 안의 birth 안의 year
```

입니다.

전체 예제:

```c
#include <stdio.h>

struct Date
{
    int year;
    int month;
    int day;
};

struct Student
{
    char name[20];
    struct Date birth;
};

int main(void)
{
    struct Student student = {"민수", {2005, 3, 15}};

    printf("이름: %s\n", student.name);
    printf("생년월일: %d-%02d-%02d\n",
           student.birth.year,
           student.birth.month,
           student.birth.day);

    return 0;
}
```

---

## 23. 구조체끼리 통째로 대입할 수 있습니다

같은 구조체 자료형끼리는 구조체 전체를 복사할 수 있습니다.

```c
struct Student a = {"민수", 20, 90.0};
struct Student b;

b = a;
```

이제 `b`의 멤버들도 `a`의 값과 같습니다.

```c
printf("%s\n", b.name);
printf("%d\n", b.age);
```

이 점은 문자 배열 단독으로는 `=` 복사가 안 되었던 것과 비교하면 흥미로운 부분입니다.

구조체 전체 대입에서는 구조체의 멤버들이 함께 복사됩니다.

---

## 24. `sizeof`로 구조체 크기를 볼 수 있습니다

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int age;
    double score;
};

int main(void)
{
    printf("Student 크기: %zu바이트\n", sizeof(struct Student));

    return 0;
}
```

실제 크기는 환경에 따라 예상보다 조금 클 수 있습니다.

왜냐하면 컴퓨터가 빠르게 접근할 수 있도록 멤버 사이에 빈 공간인 <strong>패딩(padding)</strong>을 넣을 수 있기 때문입니다.

::: info 지금 패딩을 계산할 필요는 없습니다
이번 주에는 구조체의 크기가 단순히 각 자료형 크기의 합과 꼭 같지는 않을 수 있다는 정도만 알아두면 충분합니다.
:::

---

## 25. `typedef`를 사용하면 이름을 짧게 만들 수 있습니다

구조체 변수 선언은 조금 길어 보입니다.

```c
struct Student student;
```

`typedef`를 이용하면 더 짧은 이름을 만들 수 있습니다.

```c
typedef struct Student
{
    char name[20];
    int age;
} Student;
```

이후에는:

```c
Student student;
```

처럼 사용할 수 있습니다.

이번 주에는 <strong>이런 방법도 있다</strong>는 정도만 익혀도 됩니다.

---

## 26. 실습 1 · 내 정보 구조체 만들기

아래 코드를 복사해서 실행해 보세요.

```c
#include <stdio.h>

struct Person
{
    char name[20];
    int age;
    double height;
};

int main(void)
{
    struct Person me = {"홍길동", 25, 170.5};

    printf("이름: %s\n", me.name);
    printf("나이: %d\n", me.age);
    printf("키: %.1fcm\n", me.height);

    return 0;
}
```

### 직접 바꿔 보기

1. 이름을 다른 문자열로 바꾸기
2. 나이 바꾸기
3. 키 바꾸기
4. `height` 대신 좋아하는 숫자 멤버를 추가해 보기

---

## 27. 실습 2 · 상품 정보 만들기

```c
#include <stdio.h>

struct Product
{
    char name[30];
    int price;
    int stock;
};

int main(void)
{
    struct Product product = {"연필", 1000, 25};

    printf("상품명: %s\n", product.name);
    printf("가격: %d원\n", product.price);
    printf("재고: %d개\n", product.stock);

    return 0;
}
```

### 직접 바꿔 보기

`product.price`를 1500으로 변경한 뒤 다시 실행해 보세요.

```c
product.price = 1500;
```

---

## 28. 실습 3 · 세 학생 중 최고 점수 찾기

```c
#include <stdio.h>

struct Student
{
    char name[20];
    int score;
};

int main(void)
{
    struct Student students[3] = {
        {"민수", 82},
        {"영희", 95},
        {"철수", 88}
    };

    int best = 0;

    for (int i = 1; i < 3; i++)
    {
        if (students[i].score > students[best].score)
        {
            best = i;
        }
    }

    printf("최고 점수: %s / %d점\n",
           students[best].name,
           students[best].score);

    return 0;
}
```

실행 결과:

```text
최고 점수: 영희 / 95점
```

---

## 29. 자주 하는 실수 · `struct`를 빼먹음

구조체를 다음처럼 정의했습니다.

```c
struct Student
{
    int age;
};
```

그런데 다음처럼 선언하면 일반적으로 안 됩니다.

```c
Student s;   // typedef를 하지 않았다면 오류
```

올바른 선언:

```c
struct Student s;
```

또는 `typedef`를 사용해서 `Student`라는 별칭을 먼저 만들어야 합니다.

---

## 30. 자주 하는 실수 · 점 위치를 잘못 씀

잘못된 예:

```c
student. age
student..age
.student.age
```

올바른 형태:

```c
student.age
```

점은 <strong>구조체 변수와 멤버 이름 사이에 하나만</strong> 사용합니다.

---

## 31. 자주 하는 실수 · 배열 번호와 멤버를 거꾸로 씀

구조체 배열이 있습니다.

```c
struct Student students[3];
```

첫 번째 학생의 나이는:

```c
students[0].age
```

입니다.

다음은 잘못된 형태입니다.

```c
students.age[0]
```

먼저 배열에서 학생 한 명을 선택하고:

```c
students[0]
```

그 뒤 그 학생의 멤버를 선택합니다.

```c
students[0].age
```

---

## 32. 확인 문제 1

구조체를 사용하는 가장 큰 이유는 무엇인가요?

1. 모든 값을 문자로 만들기 위해
2. 관련된 여러 종류의 값을 하나로 묶기 위해
3. 반복문을 없애기 위해
4. 함수 호출을 막기 위해

<details>
<summary>정답 보기</summary>

정답은 <strong>2번</strong>입니다.

</details>

---

## 33. 확인 문제 2

다음 구조체에서 `student`의 점수를 출력하는 올바른 코드는 무엇인가요?

```c
struct Student
{
    int score;
};

struct Student student = {90};
```

1. `student->score`
2. `student.score`
3. `Student.score`
4. `student[score]`

<details>
<summary>정답 보기</summary>

정답은 <strong>2번 `student.score`</strong>입니다.

`student`는 포인터가 아닌 일반 구조체 변수이므로 점 `.`을 사용합니다.

</details>

---

## 34. 확인 문제 3

다음 중 구조체 배열 선언은 무엇인가요?

```c
struct Student
{
    int age;
};
```

1. `struct Student students[5];`
2. `struct students Student[5];`
3. `Student.struct students[5];`
4. `struct Student[5] students;`

<details>
<summary>정답 보기</summary>

정답은 <strong>1번</strong>입니다.

</details>

---

## 35. 확인 문제 4

다음 코드를 실행한 뒤 `student.age`는 얼마일까요?

```c
struct Student
{
    int age;
};

void change(struct Student s)
{
    s.age = 100;
}

int main(void)
{
    struct Student student = {20};
    change(student);

    printf("%d\n", student.age);
}
```

<details>
<summary>정답 보기</summary>

정답은 <strong>20</strong>입니다.

함수의 `s`에는 구조체의 복사본이 전달됩니다.

</details>

---

## 36. 이번 주 핵심 요약

<div class="big-check">
<strong>구조체 = 서로 관련된 여러 종류의 값을 하나로 묶는 방법</strong><br><br>
<code>struct Student</code> = 구조체 형태<br>
<code>struct Student student;</code> = 구조체 변수<br>
<code>student.age</code> = 멤버 접근<br>
<code>students[0].age</code> = 구조체 배열의 첫 번째 원소의 멤버
</div>

가장 중요한 코드를 다시 봅시다.

```c
struct Student
{
    char name[20];
    int age;
    double score;
};
```

그리고 실제 학생 하나를 만들면:

```c
struct Student student = {"민수", 20, 92.5};
```

멤버 사용:

```c
student.name
student.age
student.score
```

입니다.

---

## 37. 다음 시간 예고

12주차 <strong>구조체와 공용체(2)</strong>에서는 이번 시간의 구조체를 포인터와 연결합니다.

다음과 같은 내용을 배웁니다.

```text
구조체 포인터
-> 연산자
typedef 활용
공용체(union)
구조체와 공용체의 메모리 차이
```

특히 `.`과 `->`의 차이, 그리고 공용체가 왜 같은 메모리를 함께 사용하는지는 그림으로 자세히 살펴보겠습니다.
