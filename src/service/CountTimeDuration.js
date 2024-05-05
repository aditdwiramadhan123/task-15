// Function to counting time duration
const countDuration = (startDate, endDate) => {
  // Menghitung selisih waktu dalam milidetik
  let timeDifferent = new Date(endDate) - new Date(startDate);
  // Menghitung selisih hari
  let differentDay = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
  // Menghitung selisih bulan
  let differentMonth = Math.floor(differentDay / 30);
  // Menghitung selisih tahun
  let differentYear = Math.floor(differentMonth / 12);

  // Mengonversi tanggal mulai ke format yang diinginkan "YYYY-MM-DD"
  let startDateFormatted = new Date(startDate).toISOString().split('T')[0];
  // Mengonversi tanggal akhir ke format yang diinginkan "YYYY-MM-DD"
  let endDateFormatted = new Date(endDate).toISOString().split('T')[0];

  let timeDuration;

  if (differentYear >= 1) {
    if (differentYear == 1) {
      timeDuration = `${differentYear} year`;
    } else {
      timeDuration = `${differentYear} years`;
    }
  } else if (differentMonth >= 1) {
    if (differentMonth == 1) {
      timeDuration = `${differentMonth} month`;
    } else {
      timeDuration = `${differentMonth} months`;
    }
  } else if (differentDay >= 0) {
    if (differentDay <= 1) {
      timeDuration = `${differentDay} day`;
    } else {
      timeDuration = `${differentDay} days`;
    }
  }

  return { timeDuration, startDate: startDateFormatted, endDate: endDateFormatted };
}

module.exports = countDuration;
