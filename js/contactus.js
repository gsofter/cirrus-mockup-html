function sendContactUs(e, lang) {
  e.preventDefault();
  const URL =
    "https://6horjo18t9.execute-api.us-east-1.amazonaws.com/forwardGetInTouchConsulting";

  let contactUsName;
  let contactUsEmail;
  let contactUsPhone;
  let contactUsSubject;
  let contactUsMessage;
  let emptyMail;
  let emptyName;
  let emptyPhone;
  let emptySubject;
  let emptyMessage;
  let invalidEmail;
  let sendFail;

  if (lang === "jp") {
    contactUsName = $('#contact-form input[name="name"][lang="jp"]').val();
    contactUsEmail = $('#contact-form input[name="email"][lang="jp"]').val();
    contactUsPhone = $('#contact-form input[name="phone"][lang="jp"]').val();
    contactUsSubject = $(
      '#contact-form input[name="cir-subject"][lang="jp"]'
    ).val();
    contactUsMessage = $('#contact-form textarea[lang="jp"]').val();
    emptyMail = "メールアドレスを入れてください。";
    emptyName = "お名前を入れてください。";
    emptyPhone = "電話番号を入れてください。";
    emptySubject = "お問い合わせ件名を入れてください。";
    emptyMessage = "お問い合わせ内容を入れてください。";
    invalidEmail = "メールアドレスは有効ではありません";
    sendFail = "メッセージ送信に失敗しました。";
  } else {
    contactUsName = $('#contact-form input[name="name"][lang="en"]').val();
    contactUsEmail = $('#contact-form input[name="email"][lang="en"]').val();
    contactUsPhone = $('#contact-form input[name="phone"][lang="en"]').val();
    contactUsSubject = $(
      '#contact-form input[name="cir-subject"][lang="en"]'
    ).val();
    contactUsMessage = $('#contact-form textarea[lang="en"]').val();
    emptyMail = "Please enter your email.";
    emptyName = "Please enter your name.";
    emptyPhone = "Please enter your phone number.";
    emptySubject = "Please enter a subject for your message.";
    emptyMessage = "Please enter the contents to the message.";
    invalidEmail = "Please enter a valid email";
    sendFail = "Could not send your inquiry.";
  }

  if (contactUsEmail === "") {
    alert(emptyMail);
    return;
  }
  if (contactUsName === "") {
    alert(emptyName);
    return;
  }
  if (contactUsPhone === "") {
    alert(emptyPhone);
    return;
  }
  if (contactUsSubject === "") {
    alert(emptySubject);
    return;
  }
  if (contactUsMessage === "") {
    alert(emptyMessage);
    return;
  }

  const reemail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reemail.test(contactUsEmail)) {
    alert(invalidEmail);
    return;
  }

  const data = {
    email: contactUsEmail,
    name: contactUsName,
    subject: contactUsSubject + "  -  " + contactUsPhone,
    message: contactUsMessage,
  };

  $.ajax({
    type: "POST",
    url: URL,
    dataType: "json",
    crossDomain: "true",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),

    success: function () {
      // clear form and show a success message
      document.getElementById("contact-form").reset();
      location.reload();
    },
    error: function () {
      // show an error message
      alert(sendFail);
    },
  });
}
