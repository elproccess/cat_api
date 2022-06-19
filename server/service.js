scraped_para = [];

function scraped_paragraph(paragrapgh, $) {
    paragrapgh.each((index, element) => {
      para = $(element).find("p").text();
      scraped_para.push({
        para: para,
      });
    });
  }
  module.exports = { scraped_paragraph};