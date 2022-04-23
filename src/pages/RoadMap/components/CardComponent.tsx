import React, {FC, useEffect, useState} from 'react';
import ProCard from '@ant-design/pro-card';
import { Image, Button, Modal, Descriptions, Typography } from 'antd';
import { ModuleItemType, ModuleChildType, ModuleGroupType, SiteType } from '../data';

import { requestContent } from '../service';

const { Text, Link } = Typography;

interface CardPropsType {
  data: SiteType;
}

interface CardStateType {
  modalProp: any;
  tabActiveKey?: string;
}

const ImgCard: FC<{imgFile: string}> = (props) => {
  const {imgFile} = props;
  const [img, setImg] = useState("");

  useEffect(()=> {
    requestContent(imgFile).then(res => {
      setImg(res.data);
    });
  });

  return (<Image width={40} src={'data:image/jpg;base64,'+img} />);
}

/**
 * 以卡片的形式展示数据
 */
class CardComponent extends React.Component<CardPropsType, CardStateType> {
  constructor(props: CardPropsType) {
    super(props);
    this.state = {
      modalProp: {
        visible: false,
        title: '',
        item: {},
      },
    };
  }

  componentDidMount() {}

  convertData = () => {};

  onTabChange = (key: string) => {
    this.setState({ tabActiveKey: key });
    console.log('onTabChange', key);
  };

  showCardExtraModal = (item: ModuleItemType) => {
    console.log('toCardExtra', item);
    this.setState({
      modalProp: {
        visible: true,
        title: item.name,
        item: item,
      },
    });
  };

  toCard = (domainName: string, item: ModuleItemType) => {
    //有img的展示图片
    //有link打开新窗口
    //todo
    return (
      <ProCard
        key={domainName + '_' + item.name}
        bordered
        headerBordered
        colSpan={6}
        title={item.name}
        extra={
          item.desc ? (
            <Button
              size="small"
              type={'link'}
              onClick={(e) => {
                e.preventDefault();
                this.showCardExtraModal(item);
              }}
            >
              更多
            </Button>
          ) : (
            ''
          )
        }
      >
        {item.text ? <Text ellipsis={true}>{item.text}</Text> : ''}
        {item.link ? (
          <Link href={item.link} target={'_blank'} ellipsis={true}>
            {item.link}
          </Link>
        ) : (
          ''
        )}
        {item.img ? <Image width={40} src={'data:image/jpg;base64,' + item.img} /> : ''}
        {item.imgFile ? <ImgCard imgFile={item.imgFile} /> : ''}
      </ProCard>
    );
  };

  toChildCard = (domainName: string, children: ModuleChildType[]) => {
    if (!children || children.length == 0) {
      return;
    }
    return (
      <ProCard gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]} wrap>
        {children?.map((child: any) => {
          return this.toCard(domainName, child);
        })}
      </ProCard>
    );
  };

  toGroupCard = (domainName: string, groups: ModuleGroupType[]) => {
    if (!groups || groups.length == 0) {
      return;
    }
    return groups?.map((group, i) => (
      <ProCard.Group
        key={domainName + '_' + group.name + '_' + i}
        title={group.name}
        direction={'column'}
      >
        <ProCard gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]} wrap>
          {group.child?.map((child: any) => this.toCard(domainName, child))}
        </ProCard>
      </ProCard.Group>
    ));
  };

  toItem = (item: any) => {
    return (
      <Descriptions bordered column={1} labelStyle={{ textAlign: 'right' }}>
        {item && item.desc ? (
          Object.keys(item.desc).map((k: string) => (
            <Descriptions.Item key={item.name + '_' + k + '_' + item.desc[k]} label={k}>
              {item.desc[k]}
            </Descriptions.Item>
          ))
        ) : (
          <div />
        )}
      </Descriptions>
    );
  };

  render() {
    const data = this.props.data;
    return (
      <>
        <ProCard tabs={{ type: 'card' }}>
          {data.modules?.map((module) => (
            <ProCard.TabPane key={data.name + '_' + module.name} tab={module.name}>
              {this.toChildCard(data.name, module.child || [])}
              {this.toGroupCard(data.name, module.groups || [])}
            </ProCard.TabPane>
          ))}
        </ProCard>

        <Modal
          title={this.state.modalProp.title}
          visible={this.state.modalProp.visible}
          footer={null}
          onCancel={() => {
            this.setState({ modalProp: { visible: false } });
          }}
        >
          {this.toItem(this.state.modalProp.item)}
        </Modal>
      </>
    );
  }
}

export default CardComponent;
