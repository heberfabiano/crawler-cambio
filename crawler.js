$(document).ready(() => {
  console.log('entrou');
  Crawler();
})

function Crawler() {

  const cheerio = require('cheerio');
  var urlToCrawl = "http://www.infomoney.com.br/mercados/cambio";
  var taxas = [];
  var taxaModel = {
    moeda: "",
    compra: "",
    venda: "",
    variacao: "",
  };
  var taxa;
  var count = 0;
  var value = "";
  var lookup = {
    0: "moeda",
    1: "compra",
    2: "venda",
    3: "variacao",
  }
  var output = '';

  axios.get(urlToCrawl)
    .then((response) => {

      var data = cheerio.load(response.data);
      data("table.tabelas > tbody > tr > td").each(function (index) {
        value = data(this).text().trim();
        if (value != "") {
          if (count == 0) {
            taxa = Object.create(taxaModel);
          };
          taxa[lookup[count]] = value;
          if (count == 3) {
            taxas.push(taxa);
            count = 0;
          } else { count++ };
        }
      });

      console.log(taxas);

      for (var i = 0; i < taxas.length; i++) {
        output += `
            <div class="col-md-3">
              <div class="well text-center">
                <h5>${taxas[i].moeda}</h5>
                Compra: ${taxas[i].compra} <br> 
                Venda: ${taxas[i].venda} <br>
                Variação: ${taxas[i].variacao}
              </div>
            </div>
          `;
      }

      console.log(output);

      $('#taxas').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}