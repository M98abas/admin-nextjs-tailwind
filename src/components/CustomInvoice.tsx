import { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import MomentP from './MomentP'
import moment from 'moment'

const CustomInvoice = ({ invoiceData }: any) => {
  const [pdfGenerated, setPdfGenerated] = useState(false)
  let total = 0
  const invoiceContainer = useRef(null)

  useEffect(() => {
    // Generate PDF only if it has not been generated before
    if (!pdfGenerated) {
      setPdfGenerated(true)
    }
  }, [pdfGenerated])

  const generatePDF = async () => {
    // Ensure the invoiceContainer is not null before proceeding
    if (!invoiceContainer.current) {
      console.error('Invoice container element not found')
      return
    }

    const pdf = new jsPDF('portrait', 'pt', 'a4')
    const data = await html2canvas(invoiceContainer.current)
    const img = data.toDataURL('image/png')
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('invoice.pdf')
  }
  // generatePDF()

  return (
    <section className="relative py-20">
      <div ref={invoiceContainer} id="invoice-container">
        <div className="py-20 relative w-[70vw]">
          <div className="container relative">
            <div className="p-12 bg-white rounded-3xl">
              <div
                className="flex flex-wrap items-center justify-between gap-6 mb-4 border-b-8 border-black"
                dir="rtl"
              >
                <div className="flex flex-col gap-3 font-tajawal">
                  <h2 className="text-5xl">صيدلية 1 سيسي</h2>
                  <h2 className="text-3xl">1CC Pharmacy</h2>
                </div>
                <img src="blueLogo.png" alt="" width={300} height={120} />
                <div className="font-tajawal">
                  <p>الرقم: 07853001111</p>
                  <p>العنوان: النجف الاشرف</p>
                  <p>MOWKE3MOMTAZ.COM</p>
                </div>
              </div>
              {/* <div className="w-full h-2 bg-black"></div> */}
              <div
                className="flex flex-col flex-wrap justify-between gap-6 py-4 items-right"
                dir="rtl"
              >
                <h5 className="text-2xl font-bold">الفاتورة : # {invoiceData.id}</h5>
                <p>
                  <span className="font-bold">تاريخ الاصدار :</span>{' '}
                  {moment(invoiceData.created_at).format('YYYY/MM/DD')}
                </p>
              </div>
              <hr />
              <div className="flex flex-wrap items-center justify-between gap-6 mt-4" dir="rtl">
                <div>
                  <h4 className="text-base font-bold">الى:</h4>
                  <p className="font-normal font-sm">
                    {invoiceData.Addresses?.district} - {invoiceData.Addresses?.street}
                    <br />
                    {invoiceData.Addresses?.city}
                    <br />
                    {invoiceData.Addresses?.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table
                  className="w-full mb-12 text-sm whitespace-pre border-collapse table-auto mt-14"
                  dir="rtl"
                >
                  <thead>
                    <tr className="text-center text-black bg-white ">
                      <th className="p-4 text-base font-semibold text-right uppercase border-white border-s-2">
                        الوصف
                      </th>
                      <th className="p-4 text-base font-semibold text-center uppercase border-white border-s-2">
                        الكمية
                      </th>
                      <th className="p-4 text-base font-semibold text-center uppercase border-white border-s-2">
                        السعر
                      </th>
                      <th className="p-4 text-base font-semibold text-center uppercase border-white border-s-2">
                        الاجمالي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white" dir="rtl">
                    {invoiceData.order_list.map((order: any, index: any) => {
                      total +=
                        total + parseInt(order.Products.price_cell) * parseInt(order.quantity)
                      return (
                        <tr className="border-b-4 border-black" key={index}>
                          <td className="p-5 text-base text-right border-white font- border-s-2">
                            {order.Products.titleAr}
                          </td>
                          <td className="p-5 text-base font-medium text-center border-white border-s-2">
                            {order.quantity}
                          </td>
                          <td className="p-5 text-base font-medium text-center border-white border-s-2">
                            IQD {order.Products.price_cell.toLocaleString()}
                          </td>
                          <td className="p-5 text-base font-medium text-center border-white border-s-2">
                            IQD{' '}
                            {(
                              parseInt(order.Products.price_cell) * parseInt(order.quantity)
                            ).toLocaleString()}
                          </td>
                        </tr>
                      )
                    })}
                    <br />
                  </tbody>
                  <tfoot className="text-center">
                    <tr className="justify-center align-middle">
                      <td></td>
                      <td></td>
                      <td className="text-left">
                        <span>المبلغ الاجمالي : </span>
                      </td>
                      <td className="text-center">
                        <span>{total.toLocaleString()}.00 IQD</span>
                      </td>
                    </tr>
                    <tr className="justify-center align-middle">
                      <td></td>
                      <td></td>
                      <td className="text-left">
                        <span>مبلغ الخصم : </span>
                      </td>
                      <td className="text-center">
                        <span>{total - invoiceData.total_price}.00 IQD</span>
                      </td>
                    </tr>
                    <tr className="justify-center align-middle">
                      <td></td>
                      <td></td>
                      <td className="text-left">
                        <span>المبلغ المستحق : </span>
                      </td>
                      <td className="text-center">
                        <span>{total - (total - invoiceData.total_price)}.00 IQD</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex flex-wrap justify-between h-40 gap-6 mt-28" dir="rtl">
                <div className="flex flex-col gap-2">
                  <p className="text-x">الاسم : {invoiceData.users.fullName}</p>
                  <p className="text-x">الرقم : {invoiceData.users.phoneNumber}</p>
                  <p className="text-x">
                    العنوان : {invoiceData.Addresses?.district} - {invoiceData.Addresses?.street}
                    {invoiceData.Addresses?.city}
                  </p>
                </div>
              </div>
              <br />
              <div className="h-20 mt-5 text-center align-middle border-t-8 border-black">
                <h1 className="justify-center mt-4 text-4xl">نتمنى لكم الصحة والعافية</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </section>
  )
}

export default CustomInvoice
