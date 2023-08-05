type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words; //문자로 된 키, 값 모양인 것을 알려준다.
  constructor() {
    this.words = {}; //term: def 들어온다.
  }
  add(word: Word) {
    //클래스를 타입처럼 사용
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  get(term: string) {
    return this.words[term];
  }
  delete(term: string) {
    if (this.words[term] !== undefined) delete this.words[term];
  }
  update(word: Word) {
    if (this.words[word.term] !== undefined) this.words[word.term] = word.def;
  }
  showAll() {
    return Object.keys(this.words).forEach((term) => console.log(term));
  } // 객체 키 값 얻기
  count() {
    return Object.keys(this.words).length;
  }
  upsert(word: Word) {
    this.words[word.term] = word.def;
  }
  exists(term: string) {
    if (this.words[term]) {
      //word.term 하면 작동하지않는다.
      return true;
    }
    return false;
  }
  bulkAdd(bulk: Word[]) {
    bulk.forEach((word: Word) => {
      if (this.words[word.term] === undefined) this.words[word.term] = word.def;
    });
  }
  bulkDelete(bulk: string[]) {
    bulk.forEach((word: string) => {
      if (this.words[word]) delete this.words[word];
    });
  }
}

class Word {
  constructor(public term: string, public def: string) {}
}

//Word 클래스를 만들고 new 연산자로 새로운 Word 만들기
const kimchi = new Word("kimchi", "한국 음식");
const pizza = new Word("pizza", "이탈리아 음식");
const hamberger = new Word("hamberger", "미국 음식");
const sushi = new Word("sushi", "일본 음식");
const bibimbab = new Word("bibimbab", "가장 좋아하는 음식");
//단어와 뜻을 가진 변수를 Word 클래스를 이용해서 만들었다.

//단어 추가하기
const dict = new Dict();
dict.add(kimchi);
dict.add(pizza);
dict.add(hamberger);
dict.add(sushi);
dict.add(bibimbab);
//Word 클래스로 만든 것을 Dict class를 이용해서 dict 만든 곳에서 add 하기

console.log("<추가된 단어 5개 확인용>");
dict.showAll(); //추가된 단어 확인하기

console.log("1. 단어 정의 리턴하기");
console.log(dict.get("kimchi")); //한국음식
console.log(dict.get("pizza")); //이탈리아 음식

console.log("2. 단어 지우기");
dict.delete("sushi");
dict.showAll();

console.log("3. 단어 업데이트");
console.log("kimchi 업데이트 전");
console.log(dict);
dict.update(new Word("kimchi", "한국 전통 음식"));
console.log("kimchi 업데이트 후");
console.log(dict);

console.log("4. 용어 보여주기");
dict.showAll();

console.log("5. 단어 갯수 세기");
console.log(dict.count());

console.log("6. upsert");
dict.upsert(new Word("egg", "라면에는 계란"));
console.log(dict.get("egg"));

console.log("7. exists");
console.log("true면 egg 목록에 추가 성공");
console.log(dict.exists("egg"));

console.log("8. bulkAdd");
dict.bulkAdd([
  { term: "닭가슴살", def: "운동할 때 먹는 음식" },
  { term: "시리얼", def: "아침 대용" },
]);
dict.showAll();

console.log("9. bulkDelete");
dict.bulkDelete(["pizza", "hamberger"]);
dict.showAll();
