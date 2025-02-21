const rowTemplate = (strings, idx, key, repetitions, correctAnswers, ratio) => {
  const str1 = strings[0]
  const str2 = strings[1]
  const str3 = strings[2]
  const str4 = strings[3]
  const str5 = strings[4]
  const str6 = strings[5]

  const lp = idx + 1
  const operation = key.split('_').join('×')
  const ratioStr = (ratio * 100).toFixed()

  return `${str1}${lp}${str2}${operation}${str3}${repetitions}${str4}${correctAnswers}${str5}${ratioStr}${str6}`
}

export default function resultsTable (resultArray) {
  const output = [
      `<tr>
        <th>Lp.</th>
        <th>Działanie</th>
        <th>Powtórzenia</th>
        <th>Poprawne odpowiedzi</th>
        <th>Wynik</th>
      </tr>`]
  for (let i = 0; i < resultArray.length; i += 1) {
    const [key, repetitions, correctAnswers] = resultArray[i]
    output.push(rowTemplate`
        <tr>
          <td>${i}</td>
          <td>${key}</td>
          <td>${repetitions}</td>
          <td>${correctAnswers}</td>
          <td>${correctAnswers / repetitions}%</td>
        <tr>
      `)
  }
  const table = document.createElement('table')
  table.className = 'table'
  table.innerHTML = output.join('')
  return table
}
