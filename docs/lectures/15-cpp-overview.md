# 15주차 · C++ 언어의 개요

지금까지 14주 동안 C언어의 기본 문법부터 포인터, 구조체, 파일, 동적 메모리까지 배웠습니다.

마지막 15주차에서는 <strong>C++</strong>을 아주 가볍게 살펴봅니다.

C++는 완전히 낯선 언어가 아닙니다.

우리가 C에서 배운 많은 문법을 그대로 사용하면서, 더 편리한 기능과 <strong>객체지향 프로그래밍</strong>이라는 새로운 방법을 추가한 언어라고 생각하면 좋습니다.

![C와 C++의 관계](/images/week15/c-cpp.svg)

::: tip 오늘의 목표
오늘 수업이 끝났을 때 아래 내용을 설명할 수 있으면 충분합니다.

1. C와 C++의 관계를 말할 수 있다.
2. C++ 파일은 보통 `.cpp` 확장자를 사용한다는 것을 안다.
3. `std::cout`과 `std::cin`으로 출력과 입력을 할 수 있다.
4. `namespace`와 `std::`가 왜 보이는지 대략 설명할 수 있다.
5. 참조자(reference)가 같은 변수를 다른 이름으로 부르는 기능임을 안다.
6. 함수 오버로딩이 무엇인지 안다.
7. 클래스와 객체의 차이를 말할 수 있다.
8. 생성자, `public`, `private`의 역할을 아주 기본적으로 이해한다.
9. C의 `malloc/free`와 C++의 `new/delete`가 연결되는 개념임을 안다.
:::

---

## 1. C++는 C를 버리고 새로 시작하는 언어가 아닙니다

C++에서도 다음 코드는 익숙합니다.

```cpp
int age = 20;

if (age >= 20)
{
    age = age + 1;
}
```

반복문도 같습니다.

```cpp
for (int i = 0; i < 5; i++)
{
    // 반복할 내용
}
```

함수도 비슷합니다.

```cpp
int add(int a, int b)
{
    return a + b;
}
```

즉 C에서 배운 기초가 사라지는 것이 아닙니다.

<div class="big-check">
<strong>C에서 배운 변수, 조건문, 반복문, 함수, 배열, 포인터는 C++에서도 계속 사용합니다.</strong>
</div>

---

## 2. C와 C++는 무엇이 다른가요?

아주 크게만 비교해 봅시다.

| C | C++ |
| --- | --- |
| 절차 중심으로 많이 작성 | 절차형 + 객체지향 등 여러 방식 가능 |
| `printf`, `scanf` | `cout`, `cin`도 사용 가능 |
| 구조체는 주로 데이터 묶음 | 클래스에 데이터와 함수를 함께 묶을 수 있음 |
| `malloc`, `free` | `new`, `delete`도 사용 가능 |
| 함수 이름 하나에 보통 하나의 형태 | 함수 오버로딩 가능 |

C++라고 해서 C 방식이 전부 금지되는 것은 아닙니다.

다만 C++에는 더 편리하고 안전하게 작성할 수 있는 기능이 많이 추가되어 있습니다.

---

## 3. C++ 파일의 확장자는 보통 `.cpp`입니다

C 파일은 보통:

```text
main.c
```

라고 만들었습니다.

C++ 파일은 보통:

```text
main.cpp
```

라고 만듭니다.

Visual Studio에서 새 파일을 추가할 때도 파일 이름을:

```text
main.cpp
```

처럼 만들면 됩니다.

::: warning 꼭 확인하세요
C++ 코드를 `main.c` 파일에 넣으면 C 컴파일러로 해석되어 C++ 문법에서 오류가 날 수 있습니다.

이번 주 실습은 파일 확장자를 반드시 `.cpp`로 사용하세요.
:::

---

## 4. 가장 작은 C++ 프로그램

```cpp
#include <iostream>

int main()
{
    std::cout << "안녕하세요, C++!\n";
    return 0;
}
```

실행 결과:

```text
안녕하세요, C++!
```

C에서 사용했던 코드와 비교해 볼까요?

```c
#include <stdio.h>

int main(void)
{
    printf("안녕하세요, C!\n");
    return 0;
}
```

가장 눈에 띄는 차이는 출력 방법입니다.

C:

```c
printf("안녕하세요\n");
```

C++:

```cpp
std::cout << "안녕하세요\n";
```

---

## 5. `#include <iostream>`은 입출력 도구를 준비합니다

C에서는:

```c
#include <stdio.h>
```

를 자주 사용했습니다.

C++에서 `cout`, `cin`을 사용하려면 보통:

```cpp
#include <iostream>
```

을 사용합니다.

`iostream`은 쉽게 말하면:

> C++에서 키보드 입력과 화면 출력을 도와주는 도구 모음

이라고 생각하면 됩니다.

---

## 6. `std::cout`으로 화면에 출력하기

```cpp
#include <iostream>

int main()
{
    std::cout << 10 << "\n";
    std::cout << 3.14 << "\n";
    std::cout << "반갑습니다" << "\n";

    return 0;
}
```

실행 결과:

```text
10
3.14
반갑습니다
```

C의 `printf()`에서는 자료형에 맞는 `%d`, `%f`, `%s` 등을 골랐습니다.

```c
printf("%d\n", age);
```

`cout`에서는 보통 `%d` 같은 형식 지정자를 직접 적지 않습니다.

```cpp
std::cout << age << "\n";
```

---

## 7. `<<`는 출력할 내용을 `cout` 쪽으로 보낸다고 생각하세요

다음 코드를 봅시다.

```cpp
std::cout << "나이: " << age << "\n";
```

처음에는 `<<`가 이상하게 보일 수 있습니다.

이렇게 읽으면 쉽습니다.

```text
cout에게 "나이: "를 보내고
그 다음 age를 보내고
그 다음 줄바꿈을 보낸다.
```

![cin과 cout의 데이터 흐름](/images/week15/io-flow.svg)

---

## 8. `std::cin`으로 키보드 입력받기

```cpp
#include <iostream>

int main()
{
    int age;

    std::cout << "나이를 입력하세요: ";
    std::cin >> age;

    std::cout << "입력한 나이: " << age << "\n";

    return 0;
}
```

C에서는:

```c
scanf("%d", &age);
```

라고 썼습니다.

C++에서는:

```cpp
std::cin >> age;
```

라고 쓸 수 있습니다.

여기서는 `&age`를 쓰지 않는다는 점도 눈여겨보세요.

---

## 9. 여러 값을 한 번에 입력받을 수도 있습니다

```cpp
#include <iostream>

int main()
{
    int a;
    int b;

    std::cout << "정수 두 개를 입력하세요: ";
    std::cin >> a >> b;

    std::cout << "합계: " << a + b << "\n";

    return 0;
}
```

예를 들어:

```text
10 20
```

을 입력하면:

```text
합계: 30
```

이 출력됩니다.

---

## 10. 문자열에는 `std::string`을 많이 사용합니다

C에서는 문자열을 보통 문자 배열로 다뤘습니다.

```c
char name[20] = "민수";
```

C++에서는 `std::string`이라는 편리한 문자열 자료형을 사용할 수 있습니다.

```cpp
#include <iostream>
#include <string>

int main()
{
    std::string name = "민수";

    std::cout << name << "\n";

    return 0;
}
```

문자열을 서로 이어 붙이기도 편리합니다.

```cpp
std::string first = "방송대 ";
std::string second = "BnB스터디";
std::string result = first + second;

std::cout << result << "\n";
```

---

## 11. 공백이 있는 문자열은 `std::getline()`으로 읽을 수 있습니다

다음 코드는 이름 전체를 한 줄로 입력받습니다.

```cpp
#include <iostream>
#include <string>

int main()
{
    std::string name;

    std::cout << "이름을 입력하세요: ";
    std::getline(std::cin, name);

    std::cout << "안녕하세요, " << name << "님!\n";

    return 0;
}
```

예:

```text
홍 길동
```

처럼 공백이 있어도 한 줄 전체를 받을 수 있습니다.

---

## 12. `std::`는 무엇인가요?

계속 다음 모양이 보입니다.

```cpp
std::cout
std::cin
std::string
```

앞의 `std::`는 <strong>표준 라이브러리의 이름 공간(namespace)</strong>을 뜻합니다.

쉽게 비유하면 물건이 들어 있는 서랍 이름이라고 생각할 수 있습니다.

```text
std 서랍 안의 cout
std 서랍 안의 cin
std 서랍 안의 string
```

`::`는 이 이름 공간 안에서 무엇을 찾을지 알려주는 기호입니다.

---

## 13. `using namespace std;`를 보면 당황하지 마세요

교재나 예제에서 다음 코드를 볼 수 있습니다.

```cpp
using namespace std;
```

그러면:

```cpp
std::cout
std::cin
std::string
```

대신:

```cpp
cout
cin
string
```

처럼 짧게 쓸 수 있습니다.

예:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "안녕하세요\n";
    return 0;
}
```

처음 배우는 동안은 이 방식도 이해하기 쉽습니다.

다만 큰 프로그램에서는 이름이 서로 겹치는 문제를 줄이기 위해 `std::cout`처럼 명확하게 쓰는 방법도 많이 사용합니다.

---

## 14. C++의 참조자(reference)를 알아봅시다

9주차에서 포인터를 배웠습니다.

C++에는 포인터와는 다른 <strong>참조자(reference)</strong>라는 기능도 있습니다.

```cpp
int a = 10;
int& ref = a;
```

이 코드에서 `ref`는 `a`와 같은 값을 복사해 둔 별도 변수가 아닙니다.

`a`라는 변수에 붙인 <strong>또 하나의 이름</strong>처럼 생각할 수 있습니다.

![C++ 참조자](/images/week15/reference.svg)

---

## 15. 참조자를 바꾸면 원래 변수도 바뀝니다

```cpp
#include <iostream>

int main()
{
    int a = 10;
    int& ref = a;

    ref = 100;

    std::cout << "a = " << a << "\n";
    std::cout << "ref = " << ref << "\n";

    return 0;
}
```

실행 결과:

```text
a = 100
ref = 100
```

`a`와 `ref`가 같은 저장 공간을 가리키기 때문입니다.

---

## 16. 포인터와 참조자는 모양이 다릅니다

포인터:

```cpp
int a = 10;
int *p = &a;

*p = 20;
```

참조자:

```cpp
int a = 10;
int& ref = a;

ref = 20;
```

참조자는 사용할 때 `*ref`처럼 별표를 붙이지 않습니다.

초보 단계에서는:

```text
포인터 → 주소를 저장하고 *로 따라감
참조자 → 같은 변수의 또 다른 이름처럼 사용
```

정도로 구분하면 충분합니다.

---

## 17. 참조자를 함수 매개변수로 사용할 수 있습니다

7주차에서 일반 매개변수는 값이 복사된다고 배웠습니다.

```cpp
void change(int x)
{
    x = 100;
}
```

이 함수는 원본을 바꾸지 못합니다.

하지만 참조자를 사용하면:

```cpp
void change(int& x)
{
    x = 100;
}
```

원본을 바꿀 수 있습니다.

전체 예제:

```cpp
#include <iostream>

void change(int& x)
{
    x = 100;
}

int main()
{
    int a = 10;

    change(a);

    std::cout << a << "\n";
    return 0;
}
```

실행 결과:

```text
100
```

---

## 18. 두 값을 참조자로 교환해 봅시다

```cpp
#include <iostream>

void swapValues(int& a, int& b)
{
    int temp = a;
    a = b;
    b = temp;
}

int main()
{
    int x = 10;
    int y = 20;

    swapValues(x, y);

    std::cout << x << " " << y << "\n";
    return 0;
}
```

실행 결과:

```text
20 10
```

C에서 포인터를 이용해 원본 값을 바꾸었던 것과 연결해서 생각해 보세요.

---

## 19. C++에서는 같은 이름의 함수를 여러 개 만들 수 있습니다

C에서는 함수 이름이 같으면 보통 문제가 됩니다.

C++에서는 매개변수의 종류나 개수가 다르면 같은 이름의 함수를 여러 개 정의할 수 있습니다.

이것을 <strong>함수 오버로딩(function overloading)</strong>이라고 합니다.

![함수 오버로딩](/images/week15/overload.svg)

---

## 20. 함수 오버로딩 예제

```cpp
#include <iostream>

int add(int a, int b)
{
    return a + b;
}

double add(double a, double b)
{
    return a + b;
}

int main()
{
    std::cout << add(10, 20) << "\n";
    std::cout << add(1.5, 2.5) << "\n";

    return 0;
}
```

실행 결과:

```text
30
4
```

컴파일러가 전달된 자료형을 보고 알맞은 `add()`를 선택합니다.

---

## 21. 객체지향이라는 말을 아주 쉽게 이해해 봅시다

C에서는 데이터와 함수를 따로 작성하는 경우가 많았습니다.

예를 들어 학생 정보를 구조체에 저장하고:

```c
struct Student
{
    char name[20];
    int score;
};
```

학생 정보를 출력하는 함수는 별도로 만들 수 있습니다.

C++에서는 <strong>데이터와 그 데이터를 다루는 함수를 하나의 설계도 안에 함께 묶을 수 있습니다.</strong>

그 설계도가 <strong>클래스(class)</strong>입니다.

---

## 22. 클래스와 객체의 차이

쉽게 비유해 봅시다.

```text
붕어빵 틀 = 클래스
실제로 만든 붕어빵 = 객체
```

또는:

```text
자동차 설계도 = 클래스
실제 자동차 = 객체
```

![클래스와 객체](/images/week15/class-object.svg)

클래스는 “이런 정보와 이런 기능을 가지겠다”는 설계도이고, 객체는 그 설계도로 실제 만들어진 값입니다.

---

## 23. 가장 간단한 클래스 만들기

```cpp
#include <iostream>
#include <string>

class Student
{
public:
    std::string name;
    int score;

    void show()
    {
        std::cout << name << " : " << score << "점\n";
    }
};

int main()
{
    Student s;

    s.name = "민수";
    s.score = 90;

    s.show();

    return 0;
}
```

실행 결과:

```text
민수 : 90점
```

11주차 구조체와 닮은 점이 많습니다.

---

## 24. 클래스 안의 변수와 함수를 뭐라고 부르나요?

다음 클래스를 봅시다.

```cpp
class Student
{
public:
    std::string name;
    int score;

    void show()
    {
        // ...
    }
};
```

`name`, `score`처럼 클래스 안에 있는 변수는 <strong>멤버 변수</strong>라고 부릅니다.

`show()`처럼 클래스 안에 있는 함수는 <strong>멤버 함수</strong>라고 부릅니다.

```text
Student 클래스
 ├─ 멤버 변수: name
 ├─ 멤버 변수: score
 └─ 멤버 함수: show()
```

---

## 25. 객체는 여러 개 만들 수 있습니다

```cpp
Student a;
Student b;
```

두 객체는 같은 `Student` 설계도를 사용하지만 각각 자기 값을 가집니다.

```cpp
a.name = "민수";
a.score = 90;

b.name = "영희";
b.score = 100;
```

`a.score`를 바꾸어도 `b.score`는 바뀌지 않습니다.

---

## 26. 생성자(constructor)는 객체가 만들어질 때 자동으로 실행됩니다

객체를 만들자마자 이름과 점수를 넣고 싶다면 생성자를 사용할 수 있습니다.

```cpp
#include <iostream>
#include <string>

class Student
{
public:
    std::string name;
    int score;

    Student(std::string n, int s)
    {
        name = n;
        score = s;
    }

    void show()
    {
        std::cout << name << " : " << score << "점\n";
    }
};

int main()
{
    Student student("민수", 90);

    student.show();
    return 0;
}
```

생성자의 특징은:

```text
클래스 이름과 이름이 같음
반환 자료형을 쓰지 않음
객체가 만들어질 때 자동 실행됨
```

입니다.

---

## 27. 생성자는 객체의 처음 상태를 준비하는 함수라고 생각하세요

다음 코드를 보면:

```cpp
Student student("민수", 90);
```

객체를 만들면서 바로 생성자가 실행됩니다.

```text
객체 만들기
    ↓
Student("민수", 90) 생성자 실행
    ↓
name = "민수"
score = 90
```

그래서 객체가 만들어진 직후부터 올바른 값을 갖게 할 수 있습니다.

---

## 28. `public`과 `private`는 무엇인가요?

클래스에는 접근 범위를 정할 수 있습니다.

주로 처음 배우는 것은 두 가지입니다.

```cpp
public:
```

과

```cpp
private:
```

입니다.

쉽게 생각하면:

```text
public  = 밖에서 사용할 수 있는 부분
private = 클래스 안에서 감춰 두는 부분
```

![public과 private](/images/week15/access.svg)

---

## 29. 중요한 값은 `private`로 숨길 수 있습니다

```cpp
#include <iostream>

class BankAccount
{
private:
    int balance;

public:
    BankAccount()
    {
        balance = 0;
    }

    void deposit(int money)
    {
        if (money > 0)
        {
            balance += money;
        }
    }

    void show()
    {
        std::cout << "잔액: " << balance << "원\n";
    }
};

int main()
{
    BankAccount account;

    account.deposit(1000);
    account.show();

    return 0;
}
```

`balance`를 아무 곳에서나 마음대로 바꾸지 못하게 하고, `deposit()` 같은 정해진 함수를 통해 변경하게 만들 수 있습니다.

---

## 30. 이것을 캡슐화라고 부릅니다

처음 들으면 어려운 단어지만 생각은 단순합니다.

> 중요한 내부 데이터는 함부로 만지지 못하게 감추고, 정해진 사용 방법만 밖에 공개한다.

이런 생각을 <strong>캡슐화(encapsulation)</strong>라고 합니다.

리모컨을 생각해도 좋습니다.

우리는 TV 내부 회로를 직접 만지지 않습니다.

밖에 공개된 버튼만 눌러 TV를 사용합니다.

---

## 31. C++의 `struct`도 함수를 가질 수 있습니다

C에서 구조체는 주로 데이터를 묶는 용도로 사용했습니다.

C++의 `struct`는 클래스처럼 멤버 함수도 넣을 수 있습니다.

```cpp
#include <iostream>

struct Point
{
    int x;
    int y;

    void show()
    {
        std::cout << x << ", " << y << "\n";
    }
};

int main()
{
    Point p = {10, 20};
    p.show();

    return 0;
}
```

C++에서는 `struct`와 `class`가 매우 비슷합니다.

초보 단계에서는 주로:

```text
struct → 기본 접근이 public
class  → 기본 접근이 private
```

라는 차이가 있다는 정도만 알아두면 충분합니다.

---

## 32. C의 `malloc/free`와 C++의 `new/delete`

14주차에서 C의 동적 메모리를 배웠습니다.

```c
int *p = malloc(sizeof(int));
free(p);
```

C++에서는 다음처럼 쓸 수도 있습니다.

```cpp
int *p = new int;

*p = 100;

std::cout << *p << "\n";

delete p;
```

쉽게 대응하면:

```text
C       C++
malloc  new
free    delete
```

입니다.

---

## 33. 배열을 `new[]`로 만들었다면 `delete[]`로 지웁니다

```cpp
#include <iostream>

int main()
{
    int count;

    std::cout << "개수: ";
    std::cin >> count;

    int *numbers = new int[count];

    for (int i = 0; i < count; i++)
    {
        numbers[i] = (i + 1) * 10;
    }

    for (int i = 0; i < count; i++)
    {
        std::cout << numbers[i] << " ";
    }

    std::cout << "\n";

    delete[] numbers;
    numbers = nullptr;

    return 0;
}
```

중요한 짝은:

```text
new       ↔ delete
new[]     ↔ delete[]
```

입니다.

---

## 34. `nullptr`은 아무 곳도 가리키지 않는 포인터를 나타냅니다

C에서 `NULL`을 보았습니다.

C++에서는 현대적인 코드에서 `nullptr`을 많이 사용합니다.

```cpp
int *p = nullptr;
```

그리고 동적 메모리를 반납한 뒤에도:

```cpp
delete p;
p = nullptr;
```

처럼 정리할 수 있습니다.

14주차에서 배운 댕글링 포인터를 줄이는 습관과 연결됩니다.

---

## 35. C++에는 `std::vector` 같은 편리한 도구도 있습니다

동적 배열을 직접 `new[]`로 관리하는 방법을 방금 봤습니다.

하지만 실제 C++에서는 크기가 변하는 배열이 필요할 때 `std::vector`를 많이 사용합니다.

아주 맛보기만 해 봅시다.

```cpp
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> numbers;

    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);

    for (int value : numbers)
    {
        std::cout << value << " ";
    }

    return 0;
}
```

실행 결과:

```text
10 20 30
```

직접 `malloc`, `realloc`, `free`를 관리하는 것보다 편리한 기능들이 C++ 표준 라이브러리에 많이 준비되어 있습니다.

이번 시간에는 “이런 것이 있다” 정도만 알아두면 됩니다.

---

## 36. 실습 1 · C 출력 코드를 C++ 출력 코드로 바꾸기

먼저 C 코드입니다.

```c
#include <stdio.h>

int main(void)
{
    int age = 20;
    printf("나이: %d\n", age);
    return 0;
}
```

C++ 버전으로 바꿔 봅시다.

```cpp
#include <iostream>

int main()
{
    int age = 20;
    std::cout << "나이: " << age << "\n";
    return 0;
}
```

### 직접 수정해 보기

1. `age`를 30으로 바꿔 실행하세요.
2. 이름을 저장할 `std::string name`도 추가해 보세요.
3. 이름과 나이를 한 줄에 출력해 보세요.

---

## 37. 실습 2 · 두 수 입력받아 큰 수 출력하기

```cpp
#include <iostream>

int main()
{
    int a;
    int b;

    std::cout << "정수 두 개: ";
    std::cin >> a >> b;

    if (a > b)
    {
        std::cout << a << "가 더 큽니다.\n";
    }
    else if (b > a)
    {
        std::cout << b << "가 더 큽니다.\n";
    }
    else
    {
        std::cout << "두 수가 같습니다.\n";
    }

    return 0;
}
```

C에서 배운 `if`문은 그대로 사용됩니다.

입출력 부분만 C++ 방식으로 달라졌다는 것을 확인하세요.

---

## 38. 실습 3 · 참조자로 두 수 교환하기

```cpp
#include <iostream>

void swapValues(int& a, int& b)
{
    int temp = a;
    a = b;
    b = temp;
}

int main()
{
    int x = 1;
    int y = 2;

    swapValues(x, y);

    std::cout << "x = " << x << "\n";
    std::cout << "y = " << y << "\n";

    return 0;
}
```

### 직접 수정해 보기

`x`와 `y`의 처음 값을 다른 숫자로 바꿔 실행해 보세요.

---

## 39. 실습 4 · 간단한 사람 클래스 만들기

```cpp
#include <iostream>
#include <string>

class Person
{
public:
    std::string name;
    int age;

    void introduce()
    {
        std::cout << "저는 " << name
                  << "이고 " << age << "살입니다.\n";
    }
};

int main()
{
    Person person;

    person.name = "민수";
    person.age = 25;

    person.introduce();

    return 0;
}
```

### 직접 수정해 보기

1. 이름과 나이를 바꾸세요.
2. `Person friendPerson;` 객체를 하나 더 만드세요.
3. 두 사람의 `introduce()`를 각각 호출해 보세요.

---

## 40. 실습 5 · 생성자를 사용해 보기

```cpp
#include <iostream>
#include <string>

class Product
{
public:
    std::string name;
    int price;

    Product(std::string n, int p)
    {
        name = n;
        price = p;
    }

    void show()
    {
        std::cout << name << " : " << price << "원\n";
    }
};

int main()
{
    Product coffee("커피", 3000);
    Product tea("차", 2500);

    coffee.show();
    tea.show();

    return 0;
}
```

객체를 만들 때 값이 바로 들어가는 과정을 확인해 보세요.

---

## 41. 자주 틀리는 부분 · `.c` 파일에 C++ 코드를 작성함

다음 코드가 올바르더라도:

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello\n";
}
```

파일 이름이:

```text
main.c
```

이면 C 코드로 처리되어 오류가 날 수 있습니다.

C++ 실습 파일은:

```text
main.cpp
```

로 만드세요.

---

## 42. 자주 틀리는 부분 · `std::`를 빠뜨림

다음 코드에는 문제가 있습니다.

```cpp
#include <iostream>

int main()
{
    cout << "Hello\n";
    return 0;
}
```

`cout`이 어느 이름 공간에 있는지 적지 않았습니다.

다음처럼 쓰거나:

```cpp
std::cout << "Hello\n";
```

위쪽에:

```cpp
using namespace std;
```

를 사용할 수 있습니다.

---

## 43. 자주 틀리는 부분 · `cin`의 화살표 방향

출력:

```cpp
std::cout << age;
```

입력:

```cpp
std::cin >> age;
```

초보자가 두 방향을 자주 바꿔 씁니다.

이렇게 기억하세요.

```text
cout << 값
cin  >> 변수
```

데이터가 어느 쪽으로 흘러가는지를 떠올리면 기억하기 쉽습니다.

---

## 44. 자주 틀리는 부분 · 참조자 초기화를 빼먹음

참조자는 선언하면서 어떤 변수를 참조할지 정해야 합니다.

잘못된 예:

```cpp
int& ref;
```

올바른 예:

```cpp
int a = 10;
int& ref = a;
```

---

## 45. 자주 틀리는 부분 · `new[]`와 `delete`를 잘못 짝지음

다음은 잘못된 짝입니다.

```cpp
int *p = new int[10];

delete p;   // 잘못된 사용
```

배열로 만들었다면:

```cpp
delete[] p;
```

를 사용해야 합니다.

```text
new int      → delete
new int[10]  → delete[]
```

짝을 기억하세요.

---

## 46. 확인 문제 1

C++ 소스 파일의 일반적인 확장자는 무엇인가요?

1. `.txt`
2. `.c`
3. `.cpp`
4. `.exe`

<details>
<summary>정답 보기</summary>

정답은 <strong>3번 `.cpp`</strong>입니다.

</details>

---

## 47. 확인 문제 2

다음 중 화면 출력에 사용하는 것은 무엇인가요?

1. `std::cin`
2. `std::cout`
3. `std::string`
4. `std::ref`

<details>
<summary>정답 보기</summary>

정답은 <strong>2번 `std::cout`</strong>입니다.

</details>

---

## 48. 확인 문제 3

다음 코드에서 `ref = 50;`을 실행한 뒤 `a`는 얼마인가요?

```cpp
int a = 10;
int& ref = a;
ref = 50;
```

<details>
<summary>정답 보기</summary>

정답은 <strong>50</strong>입니다.

`ref`는 `a`와 같은 저장 공간을 사용하는 참조자입니다.

</details>

---

## 49. 확인 문제 4

클래스와 객체의 관계로 가장 알맞은 것은 무엇인가요?

1. 클래스는 실제 값이고 객체는 주석이다.
2. 클래스는 설계도이고 객체는 설계도로 만든 실제 대상이다.
3. 클래스와 객체는 완전히 관계가 없다.
4. 객체를 만들면 클래스를 사용할 수 없다.

<details>
<summary>정답 보기</summary>

정답은 <strong>2번</strong>입니다.

</details>

---

## 50. 확인 문제 5

다음 중 올바른 짝은 무엇인가요?

1. `new` ↔ `free`
2. `malloc` ↔ `delete`
3. `new` ↔ `delete`
4. `new[]` ↔ `delete`

<details>
<summary>정답 보기</summary>

정답은 <strong>3번 `new` ↔ `delete`</strong>입니다.

배열은 `new[]` ↔ `delete[]`입니다.

</details>

---

## 51. 이번 주 핵심 요약

<div class="big-check">
<strong>C++는 C에서 배운 기초를 버리는 언어가 아닙니다.</strong><br><br>
변수 · 조건문 · 반복문 · 함수 · 배열 · 포인터는 계속 사용합니다.<br>
그 위에 더 편리한 입출력, 참조자, 오버로딩, 클래스와 객체 같은 기능이 추가됩니다.
</div>

가장 중요한 표현을 다시 봅시다.

```cpp
std::cout << value;   // 출력
std::cin >> value;    // 입력
```

참조자:

```cpp
int& ref = value;
```

클래스와 객체:

```cpp
class Student
{
    // 설계도
};

Student s;   // 객체
```

동적 메모리:

```cpp
int *p = new int;
delete p;
```

이번 주에는 C++ 전체를 외우는 것이 목표가 아닙니다.

<strong>“C에서 배운 내용을 바탕으로 이런 기능들을 더 사용할 수 있구나”</strong>라는 큰 그림을 잡았다면 충분합니다.

---

## 52. 15주 강의를 마치며

처음에는 다음 한 줄도 낯설었을 수 있습니다.

```c
printf("Hello\n");
```

하지만 지금은 다음 내용까지 살펴보았습니다.

```text
변수와 자료형
입출력과 연산자
조건문과 반복문
함수
배열과 문자열
포인터
구조체와 공용체
파일 처리
동적 메모리
C++의 기본 개념
```

모든 문법을 한 번에 외우는 사람은 거의 없습니다.

필요할 때 다시 예제를 찾아보고, 코드를 복사해서 실행해 보고, 한 부분을 바꿔 다시 실행하면 됩니다.

<div class="big-check">
<strong>코드는 눈으로만 읽는 것보다 직접 실행하고 바꿔 볼 때 훨씬 빨리 익숙해집니다.</strong>
</div>

15주 동안 배운 내용은 앞으로 다른 프로그래밍 언어와 컴퓨터과학 과목을 공부할 때도 계속 연결될 것입니다.
