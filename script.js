function getLocation() {function updateInjuryInfo() {
    const injuryInfo = {
        bleeding: {
            description: "🩸 يجب محاولة إيقاف النزيف باستخدام ضمادة نظيفة والضغط المباشر. إذا كان النزيف شديدًا، يجب استدعاء خدمات الطوارئ فورًا.",
            icon: "fas fa-tint", // أيقونة نزيف
            image: "https://example.com/bleeding.jpg", // صورة نزيف
            sound: "sounds/bleeding.mp3", // ملف الصوت
            detailedDescription: "النزيف يمكن أن يكون خطيرًا إذا لم يتم إيقافه في الوقت المناسب. اضغط على الجرح باستخدام ضمادة أو قطعة قماش نظيفة حتى يتوقف النزيف. إذا كان النزيف لا يتوقف، يجب طلب المساعدة الطبية فورًا."
        },
        "broken-bone": {
            description: "🦴 تجنب تحريك الطرف المصاب وثبته إن أمكن. يجب استدعاء الطوارئ لأخذ الشخص إلى المستشفى.",
            icon: "fas fa-bone", // أيقونة كسر
            image: "https://example.com/broken_bone.jpg", // صورة كسر
            sound: "sounds/broken_bone.mp3", // ملف الصوت
            detailedDescription: "عند كسر العظم، يجب تقليل الحركة لتجنب تفاقم الإصابة. يمكن استخدام عصا أو أي شيء ثابت لدعم الطرف المصاب لحين الوصول للمساعدة الطبية. لا تقم بمحاولة تحريك الشخص بشكل غير ضروري."
        },
        burn: {
            description: "🔥 تبريد المنطقة المصابة بماء جاري لمدة لا تقل عن 10 دقائق. تجنب إزالة الملابس الملتصقة بالحرق.",
            icon: "fas fa-fire", // أيقونة حرق
            image: "https://example.com/burn.jpg", // صورة حرق
            sound: "sounds/burn.mp3", // ملف الصوت
            detailedDescription: "إذا كانت الإصابة بحرق من الدرجة الأولى، يمكن تبريد المنطقة بماء بارد. بالنسبة للدرجات الأعلى من الحروق، يجب تجنب ملامسة المنطقة المصابة لأي شيء غير الماء البارد، وطلب المساعدة الطبية بأسرع وقت."
        },
        unconscious: {
            description: "😵 افحص التنفس والنبض، وابدأ الإنعاش القلبي الرئوي إذا لزم الأمر.",
            icon: "fas fa-user-injured", // أيقونة فقدان وعي
            image: "https://example.com/unconscious.jpg", // صورة فقدان الوعي
            sound: "sounds/unconscious.mp3", // ملف الصوت
            detailedDescription: "إذا كان الشخص فاقدًا للوعي ولكن لا يزال يتنفس، قم بوضعه في وضع الإفاقة وأطلب المساعدة الطبية فورًا. إذا توقف التنفس، يجب البدء فورًا في الإنعاش القلبي الرئوي (CPR)."
        },
        other: {
            description: "❗ يرجى وصف الحالة للطواقم فور وصولهم.",
            icon: "fas fa-question-circle", // أيقونة أخرى
            image: "https://example.com/other.jpg", // صورة أخرى
            sound: "sounds/other.mp3", // ملف الصوت
            detailedDescription: "إذا كانت الإصابة أو الحالة غير معروفة، يجب على المصاب محاولة التواصل مع الطاقم الطبي عند وصوله لتقديم كافة التفاصيل الضرورية."
        }
    };

    const injuryType = document.getElementById("injury").value;
    const infoBox = document.getElementById("injury-description");
    const iconBox = document.getElementById("injury-icon");
    const injuryImage = document.getElementById("injury-image");
    const audio = document.getElementById("injury-audio");

    if (injuryType) {
        const info = injuryInfo[injuryType];

        // تحديث النص والشرح
        infoBox.innerHTML = `<strong>شرح:</strong><br>${info.description}<br><br><strong>تفاصيل إضافية:</strong><br>${info.detailedDescription}`;

        // تغيير الأيقونة
        iconBox.className = `fas ${info.icon}`;

        // تحديث الصورة
        injuryImage.src = info.image;

        // تشغيل الصوت
        audio.src = info.sound;
        audio.play();

        // مؤثر دخول أنيق باستخدام GSAP
        gsap.fromTo(infoBox, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
    } else {
        infoBox.innerHTML = "";
        iconBox.className = ""; // إعادة الأيقونة إلى الحالة الافتراضية
        injuryImage.src = "";
        audio.pause();
    }
}
// التعرّف على الكلام (Web Speech API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'ar-SA';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  function startVoice() {
    recognition.start();
  }

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.trim();
    console.log('أمر صوتي:', command);

    // أوامر صوتية
    if (command.includes('تحديد') && command.includes('موقعي')) {
      getLocation();
    } else if (command.includes('إرسال') && command.includes('الإشارة')) {
      document.getElementById('rescueForm').submit();
    } else {
      alert('الأمر الصوتي غير مفهوم: ' + command);
    }
  };

  recognition.onerror = (e) => {
    console.error('خطأ في التعرف على الصوت:', e.error);
  };
} else {
  console.warn('SpeechRecognition غير مدعوم في هذا المتصفح.');
}
<script>
  function talkToKids() {
    const messages = [
      "لا تقلق، نحن هنا لمساعدتك!",
      "أنت بطل صغير! كل شيء سيكون بخير.",
      "الإسعاف في الطريق إليك، فقط خذ نفسًا عميقًا.",
      "هل ترى النجوم في السماء؟ فكر في شيء تحبه.",
      "شجاع جدًا! أنت تقوم بعمل رائع."
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    utter.lang = "ar-SA";
    utter.pitch = 1.2;
    utter.rate = 0.95;
    synth.speak(utter);
  }
  <script>
  // التحقق من دعم المتصفح للتعرف الصوتي
  function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("التعرف على الصوت غير مدعوم في هذا المتصفح.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "ar-SA"; // اللغة العربية - السعودية

    recognition.onstart = function () {
      alert("جارٍ الاستماع، تفضل بالتحدث...");
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("type-description").textContent = "أنت قلت: " + transcript;

      // محاولة تعبئة نوع الإصابة بناءً على الصوت
      if (transcript.includes("نزيف")) {
        document.getElementById("type").value = "bleeding";
      } else if (transcript.includes("كسر")) {
        document.getElementById("type").value = "broken-bone";
      } else if (transcript.includes("حرق")) {
        document.getElementById("type").value = "burn";
      } else if (transcript.includes("فقدان") || transcript.includes("وعي")) {
        document.getElementById("type").value = "unconscious";
      } else {
        document.getElementById("type").value = "other";
      }

      updateTypeInfo(); // تحديث الأيقونة والوصف
    };

    recognition.onerror = function (event) {
      alert("حدث خطأ أثناء التعرف على الصوت: " + event.error);
    };

    recognition.start();
  }
</script>

</script>
