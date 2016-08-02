module.exports = function(content, file, settings) {
  if (file.isHtmlLike) {
    settings.forEach(function(config, index) {
      var targetFile = config.targetFile;
      var dependencyFile = config.dependencyFile;
      var fileId = file.getId();
      if (targetFile == 'all' || targetFile == fileId || targetFile.indexOf(fileId) > -1) {
        if (typeof dependencyFile == 'string') {
          addFile(dependencyFile);
        } else if (dependencyFile instanceof Array) {
          dependencyFile.forEach(function(src, index) {
            addFile(src);
          })
        }
      }
    });
    return content;
  }
  function addFile(src) {
    file.addRequire(fis.file.wrap(src).getId());
  }
};
