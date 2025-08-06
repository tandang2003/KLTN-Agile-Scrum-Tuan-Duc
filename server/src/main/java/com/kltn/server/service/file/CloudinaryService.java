package com.kltn.server.service.file;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;

@Service
public class CloudinaryService implements FileService {
  private final Cloudinary cloudinary;
  private final String urlUpload;
  private final String rootFolder;

  public CloudinaryService(Cloudinary cloudinary, @Qualifier("url-upload-file") String urlUpload,

      @Qualifier("root-folder") String rootFolder) {
    this.cloudinary = cloudinary;
    this.urlUpload = urlUpload;
    this.rootFolder = rootFolder;
  }

  @Override
  public FileSignature getSignature(Map<String, Object> paramsToSign) {

    paramsToSign.compute("folder",
        (key, oldValue) -> (Paths.get(rootFolder,
            oldValue == null ? "" : oldValue.toString())));
    paramsToSign.put("overwrite", false);
    paramsToSign.put("unique_filename", true);
    paramsToSign.put("use_filename", true);
    String signature = cloudinary.apiSignRequest(paramsToSign, cloudinary.config.apiSecret);

    return new FileSignature(
        paramsToSign.get("folder").toString(),
        signature, urlUpload, cloudinary.config.apiKey, cloudinary.config.cloudName);

  }

  @Override
  public String getUrl(String publishId) {
    return cloudinary.url()
        .generate(publishId);
  }

  @Override
  public void deleteFile(String publicId) {
    try {
      System.out.println(publicId);
      Map result = cloudinary.api().deleteResources(Arrays.asList(publicId), ObjectUtils.emptyMap());
      System.out.println("Delete result: " + result);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

}
