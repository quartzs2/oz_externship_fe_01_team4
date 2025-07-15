# 통합 교육 플랫폼(LMS) 개발 프로젝트

## 📖 프로젝트 소개

> 통합 교육 플랫폼(LMS) 개발 프로젝트의 **어드민 페이지**입니다.  
> 쪽지 시험, 과정/기수 관리 기능을 제공합니다.

---

## :link: 배포 링크

> ### [LMS 어드민 페이지 바로가기](https://oz-externship-fe-01-team4.vercel.app)
> 본 페이지는 어드민 전용으로, 아래 계정으로 로그인하시면 모든 기능을 이용하실 수 있습니다.    
> - ID: admin@example.com    
> - PW: password1234  

---

## 🧰 기술 스택
  <div>
    
  #### 프레임워크 / 라이브러리

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">


  #### 상태 관리

  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">


  #### 스타일링

  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
  <img src="https://img.shields.io/badge/clsx-000000?style=for-the-badge">
  <img src="https://img.shields.io/badge/tailwind--merge-06B6D4?style=for-the-badge">

  #### 네트워킹

  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge">

  #### 라우팅

  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white">


  #### 배포

  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">


  #### 개발 환경

  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-FF4F8B?style=for-the-badge&logo=Prettier&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">


  #### 유틸리티

  <img src="https://img.shields.io/badge/react--hot--toast-FF4154?style=for-the-badge">
  <img src="https://img.shields.io/badge/TipTap-000000?style=for-the-badge">
  <img src="https://img.shields.io/badge/SVGR-FFB13B?style=for-the-badge">
    
  </div>  

---

## :busts_in_silhouette: 팀 소개
### FE

| <a href="https://github.com/quartzs2"/><img src="https://avatars.githubusercontent.com/u/48789173?v=4" width=100px /><br/><sub><b>@quartzs2<b/><sub/><a/><br/> | <a href="https://github.com/idubusomuch"/><img src="https://avatars.githubusercontent.com/u/99173548?v=4" width=100px /><br/><sub><b>@idubusomuch<b/><sub/><a/><br/> | <a href="https://github.com/LHM52"/><img src="https://avatars.githubusercontent.com/u/70637779?v=4" width=100px /><br/><sub><b>@LHM52<b/><sub/><a/><br/> | <a href="https://github.com/tkdgheee"/><img src="https://avatars.githubusercontent.com/u/205254646?v=4" width=100px /><br/><sub><b>@tkdgheee<b/><sub/><a/><br/> | <a href="https://github.com/dltmfql456"/><img src="https://avatars.githubusercontent.com/u/112475497?s=400&u=194044d63ea171e746fd717655cecd80f456455d&v=4" width=100px /><br/><sub><b>@dltmfql456<b/><sub/><a/><br/> | <a href="https://github.com/jihwan0492421"/><img src="https://avatars.githubusercontent.com/u/199573177?v=4" width=100px /><br/><sub><b>@jihwan0492421<b/><sub/><a/><br/> |
| :---: | :---: | :---: | :---: | :---: | :----:|
| 천승현 | 김하연 | 이형민 | 이상호 | 이슬비 | 김지환 | 
| 팀장 | 팀원 | 팀원 | 팀원 | 팀원 | 팀원 | 

---

## 📑 Git & 협업 규칙

### Branch Strategy

> | 브랜치 | 설명 |
> | ---- | ------- |
> | main | 제품의 배포 가능한 최종 상태 |
> | develop | 개발 중인 기능을 통합 |
> | feature/ | 새로운 기능 개발 |
> | hotfix/ | 운영 중인 서비스의 긴급 수정 사항 처리 |

### Issue 생성

> 1. New Issue -> Feature request 템플릿 선택
> 2. Issue 제목: <타입>: 이슈 제목
> 3. Labels, Assignees, Development 지정

### Branch 생성
> 기능별 브랜치를 develop 브랜치로부터 분기하여 feature/기능명 형식으로 생성

### Commit Convention

```
<타입>: <커밋 제목>(#이슈 번호)

- 무엇을 변경했는지 또는 왜 변경했는지 설명
```

> | 타입 | 설명 |
> | ----- | --- |
> | feat  | 새로운 기능 |
> | design | UI 디자인 변경 |
> | fix   | 버그 수정 |
> | chore | 빌드, 설정 수정  |
> | test | 테스트 코드 |
> | refactor | 리팩터링 |
> | style | 포맷 변경 (코드 수정이 없는 경우) |
> | docs  | 문서 수정 |
> | hotfix | 긴급 수정 |

### PR Review & Merge

> - 기능 개발 완료 시 develop 브랜치로 PR
> - PR 제목: <타입>: PR 제목(#이슈 번호)
> - 2명 이상의 PR 리뷰 승인 및 CI 통과해야 merge 가능
> - Merge 후 브랜치 삭제

### Code Convention

> - 함수명: camelCase
> - 컴포넌트명: PascalCase
> - 폴더명: Kebab-case

### Communication Rules

> - Discord: 실시간 소통
> - Notion: 데일리 스크럼, 일정, 회의록, 칸반보드 관리 

## :clipboard: Documents

> - [API 명세서](https://www.notion.so/API-209caf5650aa81788822c3094c8d4d80?source=copy_link)
> - [요구사항 정의서](https://www.notion.so/216caf5650aa8047907ac11e4f5b735b?source=copy_link)
> - [테이블 명세서](https://docs.google.com/spreadsheets/d/1Ys_HVx7IofC3FF9eEb-9bVpB7nZTHQhIRiPNF85SXIA/edit?gid=684962824#gid=684962824)
