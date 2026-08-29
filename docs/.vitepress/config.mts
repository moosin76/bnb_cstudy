import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: '방송대 BnB스터디',
  description: '처음 배우는 사람을 위한 아주 쉬운 C언어 스터디',
  // 사용자 지정 도메인 https://bnbc.ezcode.kr/ 의 루트에서 서비스합니다.
  base: '/',
  sitemap: {
    hostname: 'https://bnbc.ezcode.kr'
  },
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '처음으로', link: '/' },
      { text: '설치 준비', link: '/setup/download' },
      { text: '1주차', link: '/lectures/01-overview' },
      { text: '2주차', link: '/lectures/02-data-types' },
      { text: '3주차', link: '/lectures/03-io-functions-1' },
      { text: '4주차', link: '/lectures/04-operators' },
      { text: '5주차', link: '/lectures/05-control-flow' },
      { text: '6주차', link: '/lectures/06-functions-1' }
    ],
    sidebar: [
      {
        text: '스터디 시작 전',
        items: [
          { text: '시작 안내', link: '/' },
          { text: 'Visual Studio 다운로드', link: '/setup/download' },
          { text: 'Visual Studio 설치와 첫 실행', link: '/setup/install' }
        ]
      },
      {
        text: 'C언어 강의',
        items: [
          { text: '1주차 · C 언어의 개요', link: '/lectures/01-overview' },
          { text: '2주차 · 자료형과 선행처리기', link: '/lectures/02-data-types' },
          { text: '3주차 · 입·출력 함수와 연산자(1)', link: '/lectures/03-io-functions-1' },
          { text: '4주차 · 입·출력 함수와 연산자(2)', link: '/lectures/04-operators' },
          { text: '5주차 · 선택 제어문과 반복 제어문', link: '/lectures/05-control-flow' },
          { text: '6주차 · 함수와 기억 클래스(1)', link: '/lectures/06-functions-1' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '이 페이지 목차'
    },
    docFooter: {
      prev: '이전 페이지',
      next: '다음 페이지'
    },
    returnToTopLabel: '맨 위로',
    sidebarMenuLabel: '강의 목차',
    darkModeSwitchLabel: '화면 밝기',
    lightModeSwitchTitle: '밝은 화면으로',
    darkModeSwitchTitle: '어두운 화면으로',
    lastUpdated: {
      text: '마지막 수정'
    },
    search: {
      provider: 'local'
    }
  }
})
