document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const log1 = document.getElementById('log1').value;
    const log2 = document.getElementById('log2').value;

    const log1Results = countKeywordsAndMessages(log1);
    const log2Results = countKeywordsAndMessages(log2);

    displayResults('log1', log1Results);
    displayResults('log2', log2Results);

    const uniqueWarningsLog1 = log1Results.warningsList.filter(warning => !log2Results.warningsList.includes(warning));
    const uniqueWarningsLog2 = log2Results.warningsList.filter(warning => !log1Results.warningsList.includes(warning));
    const uniqueErrorsLog1 = log1Results.errorsList.filter(error => !log2Results.errorsList.includes(error));
    const uniqueErrorsLog2 = log2Results.errorsList.filter(error => !log1Results.errorsList.includes(error));

    displayUniqueMessages('unique-log1-warnings', uniqueWarningsLog1);
    displayUniqueMessages('unique-log2-warnings', uniqueWarningsLog2);
    displayUniqueMessages('unique-log1-errors', uniqueErrorsLog1);
    displayUniqueMessages('unique-log2-errors', uniqueErrorsLog2);
});

function countKeywordsAndMessages(log) {
    const warnings = (log.match(/warning/gi) || []).length;
    const errors = (log.match(/error/gi) || []).length;
    const warningsList = (log.match(/.*warning.*$/gim) || []);
    const errorsList = (log.match(/.*error.*$/gim) || []);
    return { warnings, errors, warningsList, errorsList };
}

function displayResults(logId, results) {
    document.getElementById(`${logId}-warnings`).textContent = `Warnings: ${results.warnings}`;
    document.getElementById(`${logId}-errors`).textContent = `Errors: ${results.errors}`;
    displayUniqueMessages(`${logId}-unique-warnings`, results.warningsList);
    displayUniqueMessages(`${logId}-unique-errors`, results.errorsList);
}

function displayUniqueMessages(elementId, messagesList) {
    const ulElement = document.getElementById(elementId);
    ulElement.innerHTML = ''; 
    messagesList.forEach(message => {
        const li = document.createElement('li');
        li.textContent = message;
        ulElement.appendChild(li);
    });
}
