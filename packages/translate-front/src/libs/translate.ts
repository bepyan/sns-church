const GS_KEY = 'AKfycbwX9qHQRNJjsltkPMKbdqTPGm4xKkk0L7G-ENMy9cAv9GNEtnQ0yN9D-ZANhTgYCkkkKg';
const TRANS_URL = `https://script.google.com/macros/s/${GS_KEY}/exec`;

export default function translate(text: string, callback: (_text: string) => void) {
  const request = new XMLHttpRequest();

  // https://gist.github.com/eddieoz/63d839c8a20ef508cfa4fa9562632a21
  const query = TRANS_URL + `?text=${text}&source=ko-KR&target=zh-CN`;
  request.open('GET', query, true);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
  request.send(null);
}
