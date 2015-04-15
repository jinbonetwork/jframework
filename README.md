jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 리소스들을 관리합니다.

폴더 구조
---------

* jframework
    * contrib -- 외부에서 가져온 리소스들. 버전을 특정해서 사용합니다.
        * normalize -- (CSS) 초기화 코드.
            * 3.0.3
        * bootstrap -- (CSS) grid 및 responsive.
        * font-awesome -- (CSS) 아이콘 폰트.
        * webfonts -- (CSS) 한글 웹폰트.
        * jquery -- (JS) 자바스크립트 프레임워크.
    * less -- 외부 CSS 리소스들을 바탕으로 한 사용자 스타일시트 소스.
    * css -- less 디렉토리의 소스들을 변환한 실제 스타일시트 파일.
    * js -- jquery 베이스의 사용자 스크립트.
    * html -- 글로벌 헤더/풋터 등의 마크업 컴포넌트.
    * test -- 개발용 샘플 모음.
