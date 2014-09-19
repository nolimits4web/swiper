/*=========================
  Pagination
  ===========================*/
s.updatePagination = function () {
    if (!s.params.pagination) return;
    if (s.paginationContainer && s.paginationContainer.length > 0) {
        var bulletsHTML = '';
        var numberOfBullets = s.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i++) {
            bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
        }
        s.paginationContainer.html(bulletsHTML);
        s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
    }
};