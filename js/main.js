//   navbar function 
//   navbar function 
$(document).ready(function(){

    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(Window).scrollTop()  >  30){
            $('header').addClass('header-active');
        }else{
            $('header').removeClass('header-active');
        }
    });

    
});
function updateTotal() {
  const tableBody = document.getElementById('productTableBody');
  const rows = tableBody.getElementsByTagName('tr');
  let total = 0;

  for (let i = 0; i < rows.length; i++) {
    const priceCell = rows[i].getElementsByTagName('td')[1];
    if (priceCell) {
      const priceValue = parseFloat(priceCell.textContent);
      if (!isNaN(priceValue)) total += priceValue;
    }
  }

  document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function addProductToTable() {
  const productName = document.getElementById('productName').value.trim();
  const disname=document.getElementById('disesse name').value.trim();
  const productPrice = parseFloat(document.getElementById('productPrice').value);

  if (productName !== "" && !isNaN(productPrice)) {
    const tableBody = document.getElementById('productTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <th scope="row">${tableBody.children.length + 1}</th>
      <td>${productName}</td>
      <td>${disname}</td>
      <td>${productPrice.toFixed(2)}</td>
      <td>
        <button type="button" class="btn btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(newRow);

    // clear inputs
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';

    // delete handler
    const deleteButton = newRow.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
      tableBody.removeChild(newRow);
      // re-number IDs (optional)
      Array.from(tableBody.children).forEach((r, idx) => {
        const th = r.querySelector('th');
        if (th) th.textContent = idx + 1;
      });
      updateTotal();
    });

    updateTotal();
  }
}

// form submit
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('productForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      addProductToTable();
    });
  }

  // generate invoice
  const genBtn = document.getElementById('generateInvoice');
  if (genBtn) {
    genBtn.addEventListener('click', function () {
      const totalAmount = document.getElementById('totalAmount').textContent;
      const tableBody = document.getElementById('productTableBody');
      const invoiceTableBody = document.getElementById('invoiceTableBody');
      invoiceTableBody.innerHTML = '';

      for (const row of tableBody.children) {
        const productName = row.getElementsByTagName('td')[0].textContent;
        const productPrice = row.getElementsByTagName('td')[1].textContent;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${productName}</td>
          <td>${parseFloat(productPrice).toFixed(2)}</td>
        `;
        invoiceTableBody.appendChild(newRow);
      }

      document.getElementById('invoiceTotal').textContent = parseFloat(totalAmount).toFixed(2);

      // show bootstrap modal
      $('#invoiceModal').modal('show');
    });
  }

  // print
  const printBtn = document.getElementById('printButton');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      const invoiceContent = document.querySelector('.invoice-content').innerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Invoice</title>');
      // include minimal bootstrap stylesheet for print window
      printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">');
      printWindow.document.write('</head><body>');
      printWindow.document.write(invoiceContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    });
  }
});