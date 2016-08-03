module.exports = function(content, file, settings) {
  if (typeof settings == 'object' && settings instanceof Array) {
    settings.forEach(function(config, index) {
      handleDependency(file, config.targetFile, config.dependencyFile);
    });
  } else if (typeof settings == 'object') {
    handleDependency(file, settings.targetFile, settings.dependencyFile);
  }

  return content;

  function handleDependency(file, targetFile, dependencyFile) {
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
        addRequire(dependencyFile);
      } else if (dependencyFile instanceof Array) {
        dependencyFile.forEach(function(src, index) {
          addRequire(src);
        })
      }
    }
  }

  function addRequire(src) {
    var files = fis.util.find(fis.project.getProjectPath(), new RegExp(src + '$'));
    files.forEach(function(src, index) {
      var id = fis.file.wrap(src).getId();
      file.addRequire(id);
    })
  }
};
