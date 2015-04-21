jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 리소스들을 관리합니다.

폴더 구조
---------

* jframework
	* contrib -- 외부에서 가져온 리소스들. 서브모듈로 추가하는 대신 버전을 특정해서 사용합니다.
		* 단순 저장
			* [less.js](http://lesscss.org) -- (CSS/JS) 개발 환경에서 사용할 프론트엔드 스타일시트 전처리 도구.
				* 2.5.0
			* [lessphp](http://leafo.net/lessphp/) -- (CSS/PHP) 개발 환경에서 사용할 백엔드 스타일시트 전처리 도구.
				* 0.4.0
			* [jquery](http://jquery.com) -- (JS) 자바스크립트 프레임워크.
				* 2.1.3
			* [fancybox](http://fancyapps.com) -- (JS, CSS) 전체화면 오버레이 기능을 제공하는 jQuery 플러그인.
				* 2.1.5
			* [imagesloaded]() -- (JS) 이미지가 실제로 로드됐을 때 사용자 함수를 실행하는 jQuery 플러그인.
				* 3.1.8
		* 사용자화
			* [jquery-ui](http://jqueryui.com) -- (JS, CSS) 몇 가지 사용자 인터페이스 세트를 제공하는 jQuery 플러그인.
				* 1.11.4
				* less/jquery-ui.less > css/jquery-ui.css
			* [is-loading]() -- (JS) '로딩 중' 표시 기능을 제공하는 jQuery 플러그인.
				* 1.0.6
				* less/is-loading.less > css/is-loading.css
		* 기본 소스에 포함	
			* [normalize](https://github.com/necolas/normalize.css) -- (CSS) 초기화 코드.
				* 3.0.3
			* [bootstrap](https://github.com/twbs/bootstrap) -- (CSS) grid 및 responsive.
				* 3.3.4
			* [font-awesome](https://github.com/FortAwesome/Font-Awesome) -- (CSS) 아이콘 폰트.
				* 4.3.0
			* [webfonts](https://github.com/singihae/Webfonts) -- (CSS) 한글 웹폰트.
				* 2015.01.14
	* svgs -- 자체 웹폰트 제작에 사용한 svg 파일들.
	* fonts -- 자체 웹폰트 파일.
	* less -- 외부 CSS 리소스들을 바탕으로 한 사용자 스타일시트 소스.
	* css -- less 디렉토리의 소스들을 변환한 실제 스타일시트 파일.
	* js -- jquery 베이스의 사용자 스크립트.
	* html -- 글로벌 메뉴 등의: 마크업 컴포넌트.
	* data -- 마크업 컴포넌트에서 사용할 json 파일.
	* test -- 개발용 샘플 모음.
