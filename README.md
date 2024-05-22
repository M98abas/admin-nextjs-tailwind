45.4.172.70 7822
sudo kill -9 $(sudo lsof -t -i:80)
sudo systemctl restart nginx
sudo ss -ltpn | grep :80
sudo lsof -i:80
sudo kill -9 $(sudo lsof -t -i:80) && sudo systemctl restart nginx && sudo systemctl restart apache2
PORT=4000 pm2 start npm --name Back-end -- start --host 0.0.0.0 --interpreter=/root/.nvm/versions/node/v18.12.1/bin/node
PORT=3000 pm2 start npm --name Admin -- start --host 0.0.0.0 --interpreter=/root/.nvm/versions/node/v18.12.1/bin/node

  pm2 logs Back-end

# Todo

- Not history ✅
- Prof delete ✅
- Send not to admin ✅
- Check message issue that hide message when customer send message ✅
  <!-- - Add somechanges over index page and add orders summery page -->
  <!-- - close the project and deploy it -->
- اضافة الى الرسائل اسم الزبون✅
- التخفيض مبلغ ثابت ويكون على علاج معين ✅
- الخصم على الفاتورة او سعر التوصيل✅
  جعله موثوق مجرد الوصول الى otp ✅
  الطلب يستقبل صورة
  في حال تاخر الطلب وبقى نفس الحالة يتم تغيير اللون من تاخر ١س اصفر الى  ٢س احمر وارسال ايميل ✅
  اضافة بروموكود اقل مبلغ لكي يتم تقليل مبلغ التوصيل ✅
- PromoCode to order to check the content promoCodeid
