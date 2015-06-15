jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 라이브러리 및 리소스를 관리합니다.

폴더 구조
---------

	* `classes` -- `jframework.php`에서 읽어들이는 클래스 소스.
	* `contrib` -- 외부에서 복사한 라이브러리.
	* `lib` -- 직접 작성한 라이브러리.
	* `less` -- [LESS](http://lesscss.org) 형식의 스타일시트 소스.
	* `css` -- less 폴더의 소스들을 변환한 스타일시트.
	* `js` -- 외부 라이브러리 패치 및 자바스크립트.
	* `html` -- 글로벌 메뉴 등의 공용 마크업.
	* `data` -- 설정 파일 및 각 라이브러리의 의존성을 명시한 map 파일.
	* `samples` -- 예제 모음.

기본적인 활용
-------------

### 1. 적당한 위치에 복사하고 [/jframework.php](https://github.com/jinbonetwork/jframework/blob/master/jframework.php) 파일을 불러들입니다.

	<?php
	require_once dirname(__FILE__).'/jframework/jframework.php';
	?>

### 2. [/data/resources.map.json](https://github.com/jinbonetwork/jframework/blob/master/data/resources.map.json) 파일을 참고해서 필요한 구성요소를 결정합니다.

	* 스크롤하면 애니메이션이 일어나는 요소들이 필요할 경우 `wow.js` 라이브러리를 사용.
	* '로딩 중' 표시를 할 경우 `is-loading` 라이브러리를 사용.
	* 공용 레이아웃을 사용할 경우 `jframework`를 사용.

### 3. `<HEAD></HEAD>` 사이에 다음 코드를 삽입합니다.

	<?php
	JFTemplates::printHead(array('wow.js','is-loading','jframework'));
	?>

덮어쓰기
--------

jframework 설정을 변경해야 할 경우, 다음 항목들을 살펴보세요.

### 1. 인터넷 익스플로러 8을 지원해야 하는 경우

특별한 설정은 필요없습니다. `JFTemplates::printHead()` 명령이 클라이언트 브라우저 에이전트를 검사한 뒤, 인터넷 익스플로러 8일 경우 라이브러리 의존성을 검사하기 전에 `data/resources.map.json` 파일과 `data/resources.map.fallback.json`을 합칩니다. 강제로 fallback을 적용하려면 다음과 같이 `JFResources::$force_fallback = true;`를 한 줄 추가하세요.

	<?php
	JFResources::$force_fallback = true;
	JFTemplates::printHead(array('jframwork'));
	?>

### 2. CSS 설정을 변경할 경우

jframework는 less 폴더 안의 소스 파일들을 변환해서 실제로 사용할 CSS 파일을 만들고 라이브러리 의존성 정의 파일을 이용해서 그 경로를 읽어들입니다. 따라서 새 CSS 파일을 만들었다면 정의 파일을 수정하거나 직접 `<LINK>` 또는 `<SCRIPT>` 태그를 작성해야 합니다. 새 CSS 파일을 만들 때 참고할 파일은 다음과 같습니다.

	* `less/_variables.less` -- bootstrap variables 파일의 복사본으로 컬럼 갯수, 마진, 글자 색 등의 설정값을 담고 있습니다.
	* `less/_config.less` -- `less/_variables.less` 파일과 bootstrap mixins 파일을 읽어들입니다.
	* `less/style.less` -- `less/_config.less` 파일과 부속 less 파일들을 읽어들입니다.
	* `less/bootstrap.less` -- `less/_config.less` 파일과 bootstrap less 파일들을 읽어들입니다.

작업 순서는 다음과 같습니다.

	1. `less` 폴더를 적당한 경로에 복사합니다.
	2. 새로 복사한 `less/_variables.less` 파일에서 필요한 값을 변경합니다. (필요에 따라 `less` 폴더에서 _로 시작하는 부속 less 파일들을 편집합니다.)
	3. 새로 복사한 `less` 폴더에서 _로 시작하지 않는 less 파일들을 css 파일로 변환합니다.
	4. `data/resources.map.json` 파일을 복사해서 `css` 폴더를 참조하는 항목들을 새 경로로 수정합니다.
	5. `JFTemplates::printHead()` 명령을 사용하기 전에 `JFResources::$map = 'new_less/new_resources.map.json'`과 같이 새 정의 파일의 경로를 지정합니다.

그 결과, 삽입할 코드는 이렇게 됩니다.

	<?php
	JFResources::$map = 'new_less/new_resources.map.json';
	JFTemplates::printHead(array('jframework'));
	?>
