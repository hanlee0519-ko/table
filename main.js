import { fetchWrapper } from '/fetchWrapper.js';

class DrugTable extends HTMLElement {
  data = [];
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open',
    });

    const wrapper = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    wrapper.append(thead, tbody);
    shadow.appendChild(wrapper);

    const style = document.createElement('style');
    style.textContent = `
table { 
  border-collapse: collapse;
}

td, th {
  padding: 5px;
  border: 1px solid black;
}

th {
  cursor: pointer;
}

.table-name {
  padding: 20px;
  background-color: #ffa500;
}
    `;

    shadow.appendChild(style);
  }

  async load() {
    let response = await fetchWrapper.get('/item.json');
    this.data = response.body.items;
    this.render();
  }

  render() {
    let headerHTML =
      '<tr><th class="table-name">이름</th><th class="table-name">제조사</th><th class="table-name">효과</th></tr>';

    let bodyHTML = this.data
      .map((item) => {
        return `<tr><th>${item.itemName}</th><th>${item.entpName}</th><th>${item.efcyQesitm}</th></tr>`;
      })
      .join('');

    let thead = this.shadowRoot.querySelector('thead');
    thead.innerHTML = headerHTML;
    let tbody = this.shadowRoot.querySelector('tbody');
    tbody.innerHTML = bodyHTML;
  }

  connectedCallback() {
    this.load();
  }
}

customElements.define('drug-table', DrugTable);
