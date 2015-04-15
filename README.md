jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 리소스들을 관리합니다.

폴더 구조
---------

* jframework
	* contrib -- 외부에서 가져온 리소스들. 서브모듈로 추가하는 대신 버전을 특정해서 사용합니다.
		* [normalize](https://github.com/necolas/normalize.css) -- (CSS) 초기화 코드.
			* 3.0.3
		* [bootstrap](https://github.com/twbs/bootstrap) -- (CSS) grid 및 responsive.
			* 3.3.4
		* [font-awesome](https://github.com/FortAwesome/Font-Awesome) -- (CSS) 아이콘 폰트.
			* 4.3.0
		* [webfonts](https://github.com/singihae/Webfonts) -- (CSS) 한글 웹폰트.
			* 2015.01.14
		* [less](http://lesscss.org) -- (CSS) 스타일시트 전처리 도구.
			* 2.5.0
		* [jquery](http://jquery.com) -- (JS) 자바스크립트 프레임워크.
			* 2.1.3
	* svgs -- 자체 웹폰트 제작에 사용한 svg 파일들.
	* fonts -- 자체 웹폰트 파일.
	* less -- 외부 CSS 리소스들을 바탕으로 한 사용자 스타일시트 소스.
	* css -- less 디렉토리의 소스들을 변환한 실제 스타일시트 파일.
	* js -- jquery 베이스의 사용자 스크립트.
	* html -- 글로벌 헤더/풋터 등의 마크업 컴포넌트.
	* test -- 개발용 샘플 모음.
