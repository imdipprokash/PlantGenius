export const GetInformationFormImage = async (file: any) => {
  const formdata = new FormData();
  formdata.append('file', {
    uri: file.uri,
    type: file?.type,
    name: file?.fileName,
  });
  formdata.append(
    'user_input',
    'Identify this plant and provide the following information in JSON format: Plant name, Scientific name, Plant family, Native region, Brief description, Care instructions, medicinal value.',
  );

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  //@ts-ignore

  return await fetch('https://jdxpvt.netlify.app/api/ai', requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    });
};
