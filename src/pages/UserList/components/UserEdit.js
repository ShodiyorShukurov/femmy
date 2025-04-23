import React from 'react';
import Main from '../../../components/layout/Main';
import { Card, Col, Row } from 'antd';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import Api from '../../../api';

const { Option } = Select;

const UserEdit = () => {
  const [form] = Form.useForm();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const name = params.get('name');
  const age = params.get('age');
  const mode_id = params.get('mode_id');
  const phone_number = params.get('phone_number');
  const avarage_period = params.get('avarage_period');
  const cycle_duration = params.get('cycle_duration');
  const last_period_date = params.get('last_period_date');
  const fetal_age = params.get('fetal_age');
  const baby_born_date = params.get('baby_born_date');
  const expired_date = params.get('expired_date');
  const weight = params.get('weight');
  const height = params.get('height');
  const pincode = params.get('pincode');
  const premium = params.get('premium');
  const nimadir = params.get('nimadir');

  const handleSubmitTrial = async (values) => {
    const data = {
      age: values.age,
      avarage_period: values.avarage_period,
      baby_born_date: values.baby_born_date,
      cycle_duration: values.cycle_duration,
      expired_date: values.expired_date,
      fetal_age: values.fetal_age,
      height: values.height,
      last_period_date: values.last_period_date,
      mode_id: values.mode_id,
      name: values.name,
      nimadir: values.nimadir,
      phone_number: values.phone_number,
      pincode: values.pincode,
      premium: values.premium,
      weight: values.weight,
    };

    try {
      data.id = id;
      await Api.put('/user/edit', data);
      message.success('Muvaffaqiyatli tahrirlandi');

      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Xatolik');
    } finally {
    }
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={'User Information'}
            >
              <div className="table-responsive">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmitTrial}
                  style={{ padding: '20px 20px' }}
                  initialValues={{
                    name: name,
                    age: age,
                    mode_id: mode_id,
                    phone_number: phone_number,
                    avarage_period: avarage_period,
                    cycle_duration: cycle_duration,
                    last_period_date: last_period_date
                      .slice(0, 10)
                      .split('-')
                      .join('-'),
                    fetal_age: fetal_age,
                    baby_born_date: baby_born_date
                      .slice(0, 10)
                      .split('-')
                      .join('-'),
                    expired_date: expired_date
                      .slice(0, 10)
                      .split('-')
                      .join('-'),
                    weight: weight,
                    height: height,
                    pincode: pincode,
                    premium: premium,
                    nimadir: nimadir,
                  }}
                >
                  <Row gutter={[24, 0]}>
                    <Col span={8} key={'name'}>
                      <Form.Item name={`name`} label={`Name`}>
                        <Input placeholder={`Name`} />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'age'}>
                      <Form.Item name={`age`} label={`Age`}>
                        <Input placeholder={`Age`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'mode_id'}>
                      <Form.Item name={`mode_id`} label={`Mode id`}>
                        <Input placeholder={`Mode id`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'phone_number'}>
                      <Form.Item name={`phone_number`} label={`Phone number`}>
                        <Input placeholder={`Phone number`} type="tel" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'avarage_period'}>
                      <Form.Item
                        name={`avarage_period`}
                        label={`Avarage period`}
                      >
                        <Input placeholder={`Avarage period`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'cycle_duration'}>
                      <Form.Item
                        name={`cycle_duration`}
                        label={`Cycle duration`}
                      >
                        <Input placeholder={`Cycle duration`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'last_period_date'}>
                      <Form.Item
                        name={`last_period_date`}
                        label={`Last period date`}
                      >
                        <Input placeholder={`Last period date`} type="date" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'fetal_age'}>
                      <Form.Item name={`fetal_age`} label={`Fetal age`}>
                        <Input placeholder={`Fetal age`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'baby_born_date'}>
                      <Form.Item
                        name={`baby_born_date`}
                        label={`Baby born date`}
                      >
                        <Input placeholder={`Baby born date`} type="date" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'expired_date'}>
                      <Form.Item name={`expired_date`} label={`Expired date`}>
                        <Input placeholder={`Expired date`} type="date" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'weight'}>
                      <Form.Item name={`weight`} label={`Weight`}>
                        <Input placeholder={`Weight`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'height'}>
                      <Form.Item name={`height`} label={`Height`}>
                        <Input placeholder={`Height`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'pincode'}>
                      <Form.Item name={`pincode`} label={`Pincode`}>
                        <Input placeholder={`Pincode`} type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'premium'}>
                      <Form.Item name={`premium`} label={`Premium`}>
                        <Select>
                          <Option key={'true'} value="true">
                            True
                          </Option>
                          <Option key={'false'} value="false">
                            False
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8} key={'nimadir'}>
                      <Form.Item name={`nimadir`} label={`Nimadir`}>
                        <Select>
                          <Option key={'true'} value="true">
                            True
                          </Option>
                          <Option key={'false'} value="false">
                            False
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default UserEdit;
