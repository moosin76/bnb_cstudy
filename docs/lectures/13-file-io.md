# 13주차 · 파일처리 함수

지금까지 만든 변수와 배열은 프로그램이 실행되는 동안에는 잘 기억됩니다.

하지만 프로그램을 종료하면 그 값들은 사라집니다.

그렇다면 다음에 프로그램을 다시 실행했을 때도 학생 점수나 게임 기록을 남겨 두고 싶다면 어떻게 해야 할까요?

그럴 때 사용하는 것이 <strong>파일(file)</strong>입니다.

<div class="big-check">
<strong>변수는 실행 중에 기억하고, 파일은 실행이 끝난 뒤에도 기억합니다.</strong>
</div>

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. 파일을 사용하는 이유
2. `FILE *`이 무엇인지
3. `fopen()`과 `fclose()`의 역할
4. `r`, `w`, `a` 모드의 차이
5. `fprintf()`, `fscanf()`, `fgets()`, `fputs()` 사용 방법
6. 파일의 끝 `EOF`를 올바르게 확인하는 방법
7. 텍스트 파일과 바이너리 파일의 차이
8. `fread()`, `fwrite()`로 구조체를 저장하는 기본 방법
:::

---

## 1. 왜 파일이 필요한가요?

다음 프로그램을 실행해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    int score = 95;

    printf("점수: %d\n", score);

    return 0;
}
```

실행 중에는 `score`에 95가 들어 있습니다.

하지만 프로그램이 끝나고 다시 실행하면, 이전 실행에서 사용했던 변수의 값은 남아 있지 않습니다.

그래서 오래 보관해야 하는 정보는 파일에 저장합니다.

예를 들면 다음과 같습니다.

```text
학생 성적
회원 정보
게임 저장 데이터
환경 설정
일기
프로그램 실행 기록
```

![프로그램과 파일 사이의 읽기와 쓰기](/images/week13/file-flow.svg)

---

## 2. 파일에 쓰기와 파일에서 읽기

파일 작업은 크게 두 방향입니다.

```text
프로그램 → 파일
```

이것을 <strong>쓰기(write)</strong>라고 합니다.

반대로:

```text
파일 → 프로그램
```

은 <strong>읽기(read)</strong>라고 합니다.

먼저 가장 단순한 쓰기부터 시작하겠습니다.

---

## 3. 파일 작업의 기본 순서

C언어에서 파일은 보통 다음 순서로 사용합니다.

```text
① 파일을 연다
② 읽거나 쓴다
③ 파일을 닫는다
```

코드의 모양은 다음과 비슷합니다.

```c
FILE *fp;

fp = fopen("study.txt", "w");

/* 파일 사용 */

fclose(fp);
```

처음 보면 `FILE *fp`가 낯설 수 있습니다.

9주차에서 배운 포인터가 다시 등장했습니다.

---

## 4. `FILE *fp`는 무엇인가요?

C 표준 라이브러리는 열린 파일의 여러 정보를 `FILE`이라는 자료형으로 관리합니다.

우리는 그 정보를 직접 들여다보기보다 포인터를 이용합니다.

```c
FILE *fp;
```

초보 단계에서는 이렇게 생각하면 충분합니다.

<div class="big-check">
<strong>FILE *fp = 지금 열어 둔 파일을 다루기 위한 손잡이</strong>
</div>

![FILE 포인터와 파일의 현재 위치](/images/week13/file-pointer.svg)

`fp`를 이용해서 다음과 같은 일을 합니다.

```c
fprintf(fp, ...);
fgets(..., fp);
fclose(fp);
```

---

## 5. `FILE`을 사용하려면 `<stdio.h>`가 필요합니다

파일 관련 함수 대부분은 `<stdio.h>`에 들어 있습니다.

```c
#include <stdio.h>
```

우리가 이미 사용한 `printf()`와 `scanf()`도 같은 헤더에 있습니다.

즉 `<stdio.h>`에는 화면 입출력뿐 아니라 파일 입출력 기능도 들어 있습니다.

---

## 6. 첫 번째 파일을 만들어 봅시다

아래 코드를 그대로 복사해서 실행해 보세요.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("study.txt", "w");

    if (fp == NULL)
    {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    fprintf(fp, "안녕하세요. C언어 파일입니다.\n");

    fclose(fp);

    printf("파일 저장 완료!\n");

    return 0;
}
```

실행 결과:

```text
파일 저장 완료!
```

화면에는 한 줄만 나오지만, 프로그램의 작업 폴더에는 `study.txt`라는 파일이 생깁니다.

파일을 메모장으로 열어 보면 다음 내용이 들어 있습니다.

```text
안녕하세요. C언어 파일입니다.
```

::: info 파일이 어디에 생겼나요?
`"study.txt"`처럼 파일 이름만 적으면 프로그램의 <strong>현재 작업 폴더</strong>에 생성됩니다.

Visual Studio의 실행 설정에 따라 위치가 달라 보일 수 있으므로, 파일이 바로 안 보인다면 프로젝트 폴더에서 `study.txt`를 검색해 보세요.
:::

---

## 7. `fopen()`을 한 조각씩 봅시다

다음 문장을 다시 보겠습니다.

```c
FILE *fp = fopen("study.txt", "w");
```

`fopen()`은 파일을 여는 함수입니다.

첫 번째 값:

```c
"study.txt"
```

은 파일 이름입니다.

두 번째 값:

```c
"w"
```

는 <strong>어떤 목적으로 파일을 열 것인지</strong>를 뜻합니다.

이것을 파일 열기 모드라고 합니다.

---

## 8. 가장 중요한 파일 모드 `r`, `w`, `a`

처음에는 이 세 개부터 확실히 구분하면 됩니다.

![파일 열기 모드 r w a 비교](/images/week13/file-modes.svg)

| 모드 | 뜻 | 파일이 없으면 | 기존 내용 |
| --- | --- | --- | --- |
| `"r"` | 읽기 | 열기 실패 | 그대로 |
| `"w"` | 새로 쓰기 | 새로 만듦 | <strong>지움</strong> |
| `"a"` | 이어 쓰기 | 새로 만듦 | 유지하고 뒤에 추가 |

특히 `"w"`는 꼭 조심해야 합니다.

---

## 9. `"w"`는 기존 내용을 지웁니다

`memo.txt`에 다음 내용이 있다고 합시다.

```text
어제 공부: 배열
오늘 공부: 포인터
```

그런데 프로그램에서 이렇게 열면:

```c
FILE *fp = fopen("memo.txt", "w");
```

기존 내용은 사라지고 파일이 처음부터 새로 작성됩니다.

::: danger 꼭 기억하세요
`"w"`는 <strong>기존 파일을 새 파일처럼 다시 시작</strong>합니다.

중요한 파일을 실습할 때는 복사본을 만들어 사용하세요.
:::

---

## 10. 기존 내용 뒤에 추가하려면 `"a"`

기존 기록을 지우지 않고 뒤에 추가하려면 `"a"`를 사용합니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("diary.txt", "a");

    if (fp == NULL)
    {
        printf("파일 열기 실패\n");
        return 1;
    }

    fprintf(fp, "오늘도 C언어를 공부했습니다.\n");

    fclose(fp);

    return 0;
}
```

이 프로그램을 세 번 실행하면 같은 문장이 세 줄 추가됩니다.

```text
오늘도 C언어를 공부했습니다.
오늘도 C언어를 공부했습니다.
오늘도 C언어를 공부했습니다.
```

---

## 11. 왜 `fp == NULL`을 검사하나요?

파일 열기는 항상 성공한다고 보장할 수 없습니다.

예를 들면:

```text
존재하지 않는 파일을 r 모드로 열었음
권한이 없는 위치를 열려고 함
잘못된 경로를 적음
저장 장치에 문제가 있음
```

이런 경우 `fopen()`은 `NULL`을 반환합니다.

그래서 다음 검사를 습관처럼 넣는 것이 좋습니다.

```c
if (fp == NULL)
{
    printf("파일을 열 수 없습니다.\n");
    return 1;
}
```

9주차에서 배운 `NULL` 포인터가 실제 프로그램에서 이렇게 사용됩니다.

---

## 12. `fclose()`로 반드시 닫아 줍니다

파일 사용을 끝냈다면 다음처럼 닫습니다.

```c
fclose(fp);
```

왜 닫을까요?

파일 작업은 내부적으로 여러 자원을 사용합니다.

또한 프로그램이 데이터를 잠시 모아 두었다가 파일에 기록하는 경우도 있습니다.

따라서 기본 습관은 다음과 같습니다.

```text
fopen() 했으면
사용이 끝난 뒤 fclose()
```

---

## 13. `fprintf()`는 파일용 `printf()`처럼 생각하세요

화면에 출력할 때는:

```c
printf("점수: %d\n", score);
```

파일에 출력할 때는:

```c
fprintf(fp, "점수: %d\n", score);
```

앞에 `fp`가 하나 더 들어갔습니다.

다음 예제를 실행해 봅시다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("score.txt", "w");
    int score = 95;

    if (fp == NULL)
    {
        return 1;
    }

    fprintf(fp, "C언어 점수: %d\n", score);

    fclose(fp);

    return 0;
}
```

생성되는 `score.txt`:

```text
C언어 점수: 95
```

---

## 14. 여러 값을 파일에 저장해 봅시다

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("student.txt", "w");

    char name[] = "Kim";
    int age = 20;
    double score = 92.5;

    if (fp == NULL)
    {
        return 1;
    }

    fprintf(fp, "%s %d %.1f\n", name, age, score);

    fclose(fp);

    return 0;
}
```

파일 내용:

```text
Kim 20 92.5
```

나중에 이 세 값을 다시 읽을 수도 있습니다.

---

## 15. 파일을 읽어 봅시다

먼저 `number.txt`라는 파일을 만들고 아래처럼 적어 두세요.

```text
100
```

이제 프로그램에서 읽어 봅니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("number.txt", "r");
    int number;

    if (fp == NULL)
    {
        printf("number.txt를 찾을 수 없습니다.\n");
        return 1;
    }

    fscanf(fp, "%d", &number);

    printf("파일에서 읽은 숫자: %d\n", number);

    fclose(fp);

    return 0;
}
```

실행 결과:

```text
파일에서 읽은 숫자: 100
```

---

## 16. `fscanf()`는 파일용 `scanf()`처럼 생각하세요

키보드에서 입력받을 때:

```c
scanf("%d", &number);
```

파일에서 입력받을 때:

```c
fscanf(fp, "%d", &number);
```

다시 `fp`가 앞에 추가되었습니다.

비교하면 다음과 같습니다.

| 화면/키보드 | 파일 |
| --- | --- |
| `printf()` | `fprintf()` |
| `scanf()` | `fscanf()` |

---

## 17. `fscanf()`의 성공 여부도 확인하세요

다음 파일이 있다고 합시다.

```text
Kim 20 92.5
```

세 값을 읽으려면:

```c
char name[20];
int age;
double score;

if (fscanf(fp, "%19s %d %lf", name, &age, &score) == 3)
{
    printf("%s %d %.1f\n", name, age, score);
}
```

왜 `== 3`일까요?

정상적으로 읽은 항목이 세 개이기 때문입니다.

파일 내용이 예상과 다르면 읽기에 실패할 수 있으므로 반환값을 검사하는 습관이 좋습니다.

---

## 18. 한 줄 전체를 읽고 싶다면 `fgets()`

`fscanf()`의 `%s`는 공백을 만나면 문자열 읽기를 멈춥니다.

예를 들어:

```text
Hong Gil Dong
```

같은 한 줄 전체를 읽을 때는 `fgets()`가 편합니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("message.txt", "r");
    char line[100];

    if (fp == NULL)
    {
        return 1;
    }

    if (fgets(line, sizeof(line), fp) != NULL)
    {
        printf("읽은 내용: %s", line);
    }

    fclose(fp);

    return 0;
}
```

`fgets()`의 모양을 나누어 보면:

```c
fgets(line, sizeof(line), fp)
```

입니다.

```text
line         → 읽은 내용을 넣을 문자 배열
sizeof(line) → 최대 크기
fp           → 어느 파일에서 읽을지
```

---

## 19. 문자열을 파일에 쓸 때 `fputs()`

문자열 하나를 그대로 쓸 때는 `fputs()`도 사용할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("hello.txt", "w");

    if (fp == NULL)
    {
        return 1;
    }

    fputs("첫 번째 줄\n", fp);
    fputs("두 번째 줄\n", fp);

    fclose(fp);

    return 0;
}
```

생성되는 파일:

```text
첫 번째 줄
두 번째 줄
```

::: info `fputs()`는 줄바꿈을 자동으로 붙이지 않습니다
줄을 바꾸고 싶으면 문자열 안에 직접 `\n`을 넣습니다.
:::

---

## 20. 문자 하나씩 읽고 쓰기

문자 하나를 파일에 쓸 때:

```c
fputc('A', fp);
```

문자 하나를 읽을 때:

```c
int ch = fgetc(fp);
```

여기서 `fgetc()` 결과를 `char`가 아니라 `int`에 저장하는 것이 중요합니다.

왜냐하면 실제 문자값뿐 아니라 특별한 값인 `EOF`도 구분해야 하기 때문입니다.

---

## 21. `EOF`는 파일의 끝을 알려줍니다

파일을 계속 읽다 보면 언젠가는 더 이상 읽을 데이터가 없는 지점에 도착합니다.

그 상태를 구분할 때 `EOF`를 사용합니다.

`EOF`는 흔히 <strong>End Of File</strong>, 즉 파일의 끝을 뜻한다고 설명합니다.

문자 파일 전체를 한 글자씩 출력해 보겠습니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("message.txt", "r");
    int ch;

    if (fp == NULL)
    {
        return 1;
    }

    while ((ch = fgetc(fp)) != EOF)
    {
        putchar(ch);
    }

    fclose(fp);

    return 0;
}
```

![EOF까지 읽는 올바른 반복 흐름](/images/week13/eof-loop.svg)

---

## 22. `while (!feof(fp))`로 먼저 검사하지 마세요

초보자가 자주 작성하는 코드입니다.

```c
while (!feof(fp))
{
    ch = fgetc(fp);
    putchar(ch);
}
```

이 방식은 파일 끝을 확인하는 시점 때문에 마지막 데이터를 잘못 처리할 수 있습니다.

더 좋은 습관은 <strong>읽기 함수의 반환값을 직접 확인</strong>하는 것입니다.

문자 읽기:

```c
while ((ch = fgetc(fp)) != EOF)
{
    putchar(ch);
}
```

한 줄 읽기:

```c
while (fgets(line, sizeof(line), fp) != NULL)
{
    printf("%s", line);
}
```

형식에 맞춰 읽기:

```c
while (fscanf(fp, "%d", &number) == 1)
{
    printf("%d\n", number);
}
```

---

## 23. 여러 줄을 끝까지 읽어 봅시다

`students.txt`:

```text
Kim 90
Lee 85
Park 100
```

프로그램:

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("students.txt", "r");
    char name[20];
    int score;

    if (fp == NULL)
    {
        return 1;
    }

    while (fscanf(fp, "%19s %d", name, &score) == 2)
    {
        printf("이름: %s, 점수: %d\n", name, score);
    }

    fclose(fp);

    return 0;
}
```

실행 결과:

```text
이름: Kim, 점수: 90
이름: Lee, 점수: 85
이름: Park, 점수: 100
```

---

## 24. 파일에서 읽은 점수의 평균 구하기

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("scores.txt", "r");
    int score;
    int sum = 0;
    int count = 0;

    if (fp == NULL)
    {
        return 1;
    }

    while (fscanf(fp, "%d", &score) == 1)
    {
        sum += score;
        count++;
    }

    fclose(fp);

    if (count > 0)
    {
        printf("평균: %.1f\n", (double)sum / count);
    }

    return 0;
}
```

`scores.txt`에:

```text
80
90
100
```

이 들어 있다면 결과는:

```text
평균: 90.0
```

입니다.

---

## 25. 파일 열기 모드는 더 있습니다

기본 `r`, `w`, `a`에 `+`를 붙인 모드도 있습니다.

| 모드 | 의미 |
| --- | --- |
| `r+` | 기존 파일 읽기 + 쓰기 |
| `w+` | 새로 만들고 읽기 + 쓰기, 기존 내용 삭제 |
| `a+` | 읽기 + 파일 끝에 이어 쓰기 |

하지만 처음에는 `r`, `w`, `a`를 먼저 확실하게 익히는 것이 좋습니다.

`+` 모드는 필요할 때 다시 찾아봐도 됩니다.

---

## 26. 텍스트 파일과 바이너리 파일

파일은 크게 두 가지 방식으로 생각해 볼 수 있습니다.

![텍스트 파일과 바이너리 파일 비교](/images/week13/text-binary.svg)

### 텍스트 파일

숫자 100을 문자 `1`, `0`, `0`처럼 사람이 읽을 수 있는 형태로 저장합니다.

```text
100
```

메모장으로 열어 보기 쉽습니다.

### 바이너리 파일

메모리에 있는 데이터 형태에 더 가깝게 저장합니다.

사람이 메모장으로 열어 바로 읽기는 어렵습니다.

대신 구조체 같은 데이터를 통째로 저장할 때 편리할 수 있습니다.

---

## 27. 바이너리 모드 `rb`, `wb`, `ab`

바이너리 파일에서는 보통 모드 뒤에 `b`를 붙입니다.

```c
"rb"
"wb"
"ab"
```

뜻은 다음과 같습니다.

```text
rb → 바이너리 읽기
wb → 바이너리 새로 쓰기
ab → 바이너리 이어 쓰기
```

특히 Windows에서는 텍스트 모드와 바이너리 모드의 차이를 구분해서 사용하는 것이 좋습니다.

---

## 28. `fwrite()`로 구조체를 저장해 봅시다

12주차에서 만든 구조체를 파일에 통째로 저장해 보겠습니다.

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
    struct Student s = {"Kim", 20, 95.5};
    FILE *fp = fopen("student.dat", "wb");

    if (fp == NULL)
    {
        return 1;
    }

    fwrite(&s, sizeof(s), 1, fp);

    fclose(fp);

    return 0;
}
```

핵심 문장은:

```c
fwrite(&s, sizeof(s), 1, fp);
```

입니다.

아주 쉽게 읽으면:

```text
s의 주소에서
s 하나 크기만큼
1개를
fp 파일에 쓴다
```

라고 생각할 수 있습니다.

---

## 29. `fread()`로 구조체를 다시 읽기

앞에서 만든 `student.dat`를 읽어 봅시다.

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
    struct Student s;
    FILE *fp = fopen("student.dat", "rb");

    if (fp == NULL)
    {
        return 1;
    }

    if (fread(&s, sizeof(s), 1, fp) == 1)
    {
        printf("이름: %s\n", s.name);
        printf("나이: %d\n", s.age);
        printf("점수: %.1f\n", s.score);
    }

    fclose(fp);

    return 0;
}
```

`fread()`도 실제로 읽은 항목 수를 반환합니다.

그래서:

```c
== 1
```

을 검사했습니다.

---

## 30. 바이너리 구조체 파일의 주의점

구조체를 `fwrite()`로 바로 저장하면 매우 편해 보입니다.

하지만 다음 점은 알고 있어야 합니다.

```text
컴파일러의 구조체 패딩
자료형 크기
컴퓨터 환경
프로그램 버전
```

등이 달라지면 같은 파일을 다른 환경에서 그대로 읽기 어려울 수 있습니다.

이번 수업에서는 <strong>바이너리 파일의 기본 원리를 경험하기 위한 방법</strong>으로 이해하면 충분합니다.

장기간 호환해야 하는 실제 데이터 형식은 별도의 설계가 필요합니다.

---

## 31. 파일에도 현재 위치가 있습니다

파일을 읽을 때 컴퓨터는 지금 어디까지 읽었는지 기억합니다.

한 글자를 읽으면 다음 글자로 이동하고, 한 줄을 읽으면 그 다음 위치로 이동합니다.

![파일 위치와 rewind, fseek](/images/week13/file-position.svg)

이 위치를 옮기는 함수도 있습니다.

---

## 32. `rewind()`로 처음으로 돌아가기

파일을 끝까지 읽은 뒤 다시 처음부터 읽고 싶다면:

```c
rewind(fp);
```

를 사용할 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("number.txt", "r");
    int number;

    if (fp == NULL)
    {
        return 1;
    }

    fscanf(fp, "%d", &number);
    printf("첫 번째 읽기: %d\n", number);

    rewind(fp);

    fscanf(fp, "%d", &number);
    printf("다시 읽기: %d\n", number);

    fclose(fp);

    return 0;
}
```

---

## 33. `ftell()`과 `fseek()`는 책갈피처럼 생각하세요

현재 파일 위치를 알아볼 때:

```c
long pos = ftell(fp);
```

위치를 옮길 때:

```c
fseek(fp, 0, SEEK_SET);
```

를 사용할 수 있습니다.

`SEEK_SET`은 파일 시작을 기준으로 한다는 뜻입니다.

다음 상수들도 있습니다.

```text
SEEK_SET → 파일 시작 기준
SEEK_CUR → 현재 위치 기준
SEEK_END → 파일 끝 기준
```

이번 주에는 <strong>파일 위치를 움직일 수도 있다</strong>는 정도만 이해하면 충분합니다.

---

## 34. 파일 복사 프로그램을 만들어 봅시다

문자 하나씩 읽고 그대로 쓰면 간단한 텍스트 파일 복사 프로그램을 만들 수 있습니다.

```c
#include <stdio.h>

int main(void)
{
    FILE *src = fopen("source.txt", "r");
    FILE *dst = fopen("copy.txt", "w");
    int ch;

    if (src == NULL || dst == NULL)
    {
        printf("파일 열기 실패\n");

        if (src != NULL)
            fclose(src);

        if (dst != NULL)
            fclose(dst);

        return 1;
    }

    while ((ch = fgetc(src)) != EOF)
    {
        fputc(ch, dst);
    }

    fclose(src);
    fclose(dst);

    printf("복사 완료\n");

    return 0;
}
```

`source.txt`의 내용이 그대로 `copy.txt`에 복사됩니다.

---

## 35. 직접 실습 · 하루 공부 기록 남기기

다음 프로그램을 복사해서 실행해 보세요.

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("study_log.txt", "a");
    int minutes;

    if (fp == NULL)
    {
        printf("파일 열기 실패\n");
        return 1;
    }

    printf("오늘 공부한 시간(분): ");
    scanf("%d", &minutes);

    fprintf(fp, "C언어 공부: %d분\n", minutes);

    fclose(fp);

    printf("공부 기록을 저장했습니다.\n");

    return 0;
}
```

### 직접 바꿔 보기

1. 공부 과목도 입력받도록 바꾸기
2. 공부한 페이지 수도 저장하기
3. 프로그램을 여러 번 실행한 뒤 `study_log.txt` 확인하기
4. `"a"`를 `"w"`로 바꿨다가 어떤 차이가 생기는지 <strong>복사본 파일에서</strong> 확인하기

---

## 36. 직접 실습 · 학생 점수 파일 만들기

```c
#include <stdio.h>

int main(void)
{
    FILE *fp = fopen("scores.txt", "w");

    if (fp == NULL)
    {
        return 1;
    }

    for (int i = 1; i <= 3; i++)
    {
        int score;

        printf("%d번 학생 점수: ", i);
        scanf("%d", &score);

        fprintf(fp, "%d\n", score);
    }

    fclose(fp);

    return 0;
}
```

프로그램을 실행한 뒤 `scores.txt`를 직접 열어서 값이 어떻게 저장되었는지 확인하세요.

그 다음 24번의 평균 계산 프로그램으로 다시 읽어 보면 좋습니다.

---

## 37. 자주 하는 실수 · `fopen()` 실패를 확인하지 않음

위험한 코드:

```c
FILE *fp = fopen("missing.txt", "r");
fscanf(fp, "%d", &number);
```

파일이 없다면 `fp`는 `NULL`이 될 수 있습니다.

그 상태로 사용하면 프로그램에 문제가 생길 수 있습니다.

반드시 먼저 검사합니다.

```c
if (fp == NULL)
{
    return 1;
}
```

---

## 38. 자주 하는 실수 · `w`와 `a` 혼동

기존 일기 뒤에 오늘 내용을 추가하려는데:

```c
fopen("diary.txt", "w");
```

를 사용하면 어떻게 될까요?

기존 내용이 사라집니다.

이어 쓰려면:

```c
fopen("diary.txt", "a");
```

를 사용합니다.

<div class="big-check">
<strong>w = 새 종이로 다시 시작</strong><br><br>
<strong>a = 기존 종이 맨 아래에 이어 쓰기</strong>
</div>

---

## 39. 자주 하는 실수 · 파일을 닫지 않음

```c
FILE *fp = fopen("data.txt", "w");
fprintf(fp, "hello\n");
```

작은 예제에서는 프로그램 종료 시 정리되는 것처럼 보여도, 파일을 열었다면 사용 후 명시적으로 닫는 습관을 가져야 합니다.

```c
fclose(fp);
```

---

## 40. Visual Studio에서 `fopen` 경고가 보인다면

Visual Studio에서는 표준 C 함수인 `fopen()`에 대해 C4996 경고를 보여 줄 수 있습니다.

수업에서는 C 표준 문법을 익히기 위해 `fopen()`을 사용합니다.

Visual Studio 전용 함수로는 다음과 같은 형태도 있습니다.

```c
FILE *fp = NULL;
fopen_s(&fp, "study.txt", "w");
```

하지만 `fopen_s()`는 모든 C 컴파일러에서 똑같이 제공되는 표준 함수는 아닙니다.

따라서 지금은:

```text
표준 C 학습 → fopen()
Visual Studio 전용 대안 → fopen_s()
```

정도로 구분해 두면 충분합니다.

---

## 41. 확인 문제 1 · 새 파일에 쓰기

새 파일을 만들거나 기존 내용을 지우고 처음부터 쓰려면 어떤 모드를 사용하나요?

<details>
<summary>정답 보기</summary>

정답은 `"w"`입니다.

단, 기존 파일이 있다면 내용이 사라지므로 주의해야 합니다.

</details>

---

## 42. 확인 문제 2 · 기존 내용 뒤에 추가

다음 중 기존 내용을 유지하면서 파일 끝에 내용을 추가하는 모드는 무엇인가요?

1. `"r"`
2. `"w"`
3. `"a"`
4. `"x"`

<details>
<summary>정답 보기</summary>

정답은 <strong>3번 `"a"`</strong>입니다.

</details>

---

## 43. 확인 문제 3 · 파일 열기 실패

다음 검사에서 `fp == NULL`은 무엇을 뜻하나요?

```c
FILE *fp = fopen("data.txt", "r");

if (fp == NULL)
{
    /* ... */
}
```

<details>
<summary>정답 보기</summary>

파일을 정상적으로 열지 못했다는 뜻입니다.

예를 들어 `r` 모드인데 `data.txt`가 존재하지 않을 수 있습니다.

</details>

---

## 44. 확인 문제 4 · 파일 끝까지 한 글자씩 읽기

빈칸에 들어갈 값은 무엇일까요?

```c
while ((ch = fgetc(fp)) != ______)
{
    putchar(ch);
}
```

<details>
<summary>정답 보기</summary>

정답은 `EOF`입니다.

```c
while ((ch = fgetc(fp)) != EOF)
```

</details>

---

## 45. 확인 문제 5 · 텍스트와 바이너리

다음 중 구조체를 바이너리 형태로 통째로 저장할 때 사용하는 함수는 무엇인가요?

1. `fprintf()`
2. `fputs()`
3. `fwrite()`
4. `printf()`

<details>
<summary>정답 보기</summary>

정답은 <strong>3번 `fwrite()`</strong>입니다.

읽을 때는 `fread()`를 사용할 수 있습니다.

</details>

---

## 46. 이번 주 핵심 요약

파일 작업의 기본 흐름은 세 단계입니다.

```text
열기 → 읽기/쓰기 → 닫기
```

기본 코드:

```c
FILE *fp = fopen("data.txt", "r");

if (fp == NULL)
{
    return 1;
}

/* 파일 작업 */

fclose(fp);
```

꼭 기억할 기본 모드:

```text
r = 읽기
w = 새로 쓰기, 기존 내용 삭제
a = 이어 쓰기
```

주요 텍스트 함수:

```text
fprintf()  파일에 형식에 맞춰 쓰기
fscanf()   파일에서 형식에 맞춰 읽기
fputs()    문자열 쓰기
fgets()    한 줄 읽기
fputc()    문자 하나 쓰기
fgetc()    문자 하나 읽기
```

바이너리 함수:

```text
fwrite()   바이너리 쓰기
fread()    바이너리 읽기
```

<div class="big-check">
<strong>파일을 열었으면 성공 여부를 확인하고, 사용이 끝나면 반드시 닫습니다.</strong>
</div>

---

## 47. 다음 시간 예고

다음 14주차에서는 <strong>메모리 동적 할당</strong>을 배웁니다.

지금까지 배열 크기는 보통 프로그램을 작성할 때 미리 정했습니다.

```c
int numbers[10];
```

하지만 실행 중에 사용자에게 몇 개가 필요한지 물어본 뒤 그만큼의 메모리를 만들고 싶을 수도 있습니다.

다음 시간에는:

```text
malloc()
calloc()
realloc()
free()
```

를 이용해 <strong>필요할 때 메모리를 빌리고, 다 쓰면 돌려주는 방법</strong>을 그림과 함께 배웁니다.
