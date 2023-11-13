import { getAntdFieldsRequireRule } from '@/helpers/validations';
import { Form, Modal, message } from 'antd';
import axios from 'axios'

type CategoryFormData = {
  name: string;
  description: string;
}

function CategoryForm({
  showCategoryForm,
  setShowCategoryForm,
  reloadData,
}: CategoryFormProps) {

  const [form] = Form.useForm()

  const onFinish = async(values: CategoryFormData) => {
    try {
      const res = await axios.post("http://localhost:3000/category", values)
      message.success("Category added successfully")
      reloadData();
      setShowCategoryForm(false)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  return (
    <Modal
      title={<h1 className="text-2xl font-bold text-gray-800">Add Category</h1>}
      open={showCategoryForm}
      onCancel={() => {
        setShowCategoryForm(false);
      }}
      centered
      closable={false}
      okText="Save"
      onOk={() => {
        form.submit();
      }}
    >
      <Form layout="vertical" className="flex flex-col gap-5" form={form} onFinish={onFinish}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={getAntdFieldsRequireRule('Category name is required!')}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={getAntdFieldsRequireRule('Description is required!')}
        >
          <textarea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;

interface CategoryFormProps {
  showCategoryForm: boolean;
  setShowCategoryForm: (show: boolean) => void;
  reloadData: () => void;
}
