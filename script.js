    // script form to googlesheet
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyFiSWGwRC4xycLZyH8uxG5HCrzP7e4dXqeZsVjtcpJdzh7u4DVochwuViV-EEUhL4/exec'
    const form = document.forms['cashflow-kbb'];
    const btnKirim = document.querySelector('.btn-kirim');
    const btnLoading = document.querySelector('.btn-loading');
    const myAlert = document.querySelector('.my-alert');
     
       form.addEventListener('submit', e => {
         e.preventDefault();
         // ketika tombol submit diklik
            // tampilkan tombol loading, hilangkan tombol kirim
            btnLoading.classList.toggle('d-none');
            btnKirim.classList.toggle('d-none');
         fetch(scriptURL, { method: 'POST', body: new FormData(form)})
         .then((response) => {
                // tampilkan tombol kirim, hilangkan tombol loading
                btnLoading.classList.toggle('d-none');
                btnKirim.classList.toggle('d-none');
                // tampilkan alert
                myAlert.classList.toggle('d-none');
                // reset formnya
                form.reset();
                console.log('Success!', response);
              })
              .catch((error) => console.error('Error!', error.message));
          });


function hitungTotal(){
    var ikhtiar = $('input[name="angikhtiar"]').val();
    var individu = $('input[name="angindividu"]').val();
    var jumlah = Number(ikhtiar) + Number(individu);
    if(!isNaN(jumlah)){
        $('input[name="tangsuran"]').val(jumlah);
    }else{
        $('input[name="tangsuran"]').val(0);
    }
}

function hitungAdmin(){
    var biayaAdmin = $('input[name="adm"]').val();
    var danaKegiatan = $('input[name="kegiatan"]').val();
    var total = Number(biayaAdmin) + Number(danaKegiatan);
    if(!isNaN(total)){
        $('input[name="tadm"]').val(total);
    }else{
        $('input[name="tadm"]').val(0);
    }
}

// let namaVariabel = document.querySelector(element);

// hitung saldo
function hitungSaldo(){
    var kasAwal = $('input[name="mkasawal"]').val();
    var totalAngsuran = $('input[name="tangsuran"]').val();
    var tabunganSukarelaIn = $('input[name="tsukarela"]').val();
    var tabunganBerencanaIn = $('input[name="tberencana"]').val();
    var simpananWajib = $('input[name="swajib"]').val();
    var infaq = $('input[name="infaq"]').val();
    var kartuAngsuran = $('input[name="ka"]').val();
    var bukuTabungan = $('input[name="bt"]').val();
    var tambalSulam = $('input[name="tsulamrp"]').val();
    var totalAdmin = $('input[name="tadm"]').val();
    var asuransi = $('input[name="asuransi"]').val();
    var dropingRp = $('input[name="dropingrp"]').val();
    var tabunganSukarelaOut = $('input[name="pensukarela"]').val();
    var tabunganBerencanaOut = $('input[name="penberencana"]').val();
    var pengunduranDiriRp = $('input[name="pengundurandiri"]').val();
    var saldo = Number(kasAwal) + Number(totalAngsuran) + Number(tabunganSukarelaIn) + 
    Number(tabunganBerencanaIn) + Number(simpananWajib) + Number(infaq) + Number(kartuAngsuran) + 
    Number(bukuTabungan) + Number(tambalSulam) + Number(totalAdmin) + Number(asuransi) - Number(dropingRp) - 
    Number(tabunganSukarelaOut) - Number(tabunganBerencanaOut) - Number(pengunduranDiriRp);
    if(!isNaN(saldo)){
        $('input[name="saldo"]').val(saldo);
    }else{
        $('input[name="saldo"]').val(0);
    }

}

function hitungKartu(){
    var kartu = $('input[name="ka"]').val();
    var pf = parseInt(kartu) / 1000;
    if(!isNaN(pf)){
        $('input[name="rtpf"]').val(pf);
    }else{
        $('input[name="rtpf"]').val(0);
    }
}

function tambalSulam(){
    var sulam = $('input[name="tsulamrp"]').val();
    var tambalPf = parseInt(sulam) / 20000;
    if(!isNaN(tambalPf)){
        $('input[name="tspf"]').val(tambalPf);
    }else{
        $('input[name="tspf"]').val(0)
    }
}


// disini adalah script titik
var rupiah = document.querySelector('.inputBox input[type="text"]');
rupiah.addEventListener('keyup', function (e) {
    rupiah.value = formatRupiah(this.value, '');
});

/* Fungsi formatRupiah */
var rupiah = document.querySelectorAll('.inputBox input[type="text"]');
rupiah.forEach(function(el) {
  el.addEventListener('keyup', function (e) {
    el.value = formatRupiah(this.value, '');
  });
});

/* Fungsi formatRupiah */
function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
}