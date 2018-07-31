grunt.initConfig({
  aws: grunt.file.readJSON("aws-keys.json"),

  aws_s3: {
    options: {
      accessKeyId: "<%= aws.AWSAccessKeyId %>",
      secretAccessKey: "<%= aws.AWSSecretKey %>"
    },
    dist: {
      options: {
        bucket: "airfec2018"
      }
    }
  }
});
