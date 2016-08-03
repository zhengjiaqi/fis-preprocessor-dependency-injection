module.exports = function(content, file, settings) {
  settings.forEach(function(config, index) {
    var targetFile = config.targetFile;
    var dependencyFile = config.dependencyFile;
    var fileId = file.getId();
    var doAddFile = false;
    if (typeof targetFile == 'string') {
      if (targetFile == 'all') {
        doAddFile = true;
      } else {
        var regexp = new RegExp('^' + targetFile + '$');
        regexp.test(fileId) && (doAddFile = true)
      }
    } else if (targetFile instanceof Array) {
      targetFile.forEach(function(src, index) {
        var regexp = new RegExp('^' + src + '$');
        regexp.test(fileId) && (doAddFile = true)
      })
    }
    if (doAddFile) {
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

  function addFile(src) {
    var files = fis.util.find(fis.project.getProjectPath(), new RegExp(src + '$'));
    files.forEach(function(src, index) {
      var id= fis.file.wrap(src).getId();
      file.addRequire(id);
    })
  }
};
