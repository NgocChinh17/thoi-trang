import { useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Card, Row, Col, Spin, Space, notification, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import { ROUTES } from "../../../../constants/routes";
import {
  getFavoriteListRequest,
  unFavoriteProductRequest,
} from "../../../../redux/slicers/favorite.slice";

import * as S from "./styles";

function FavoriteProducts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (userInfo.data?.id) {
      dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
    }
  }, [userInfo.data, dispatch]);

  const handleUnFavoriteProduct = (id) => {
    dispatch(
      unFavoriteProductRequest({
        id: id,
        callback: () => {
          if (userInfo.data?.id) {
            dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
          }
        },
      })
    );
    notification.success({
      message: "Đã Xóa Sản Phẩm Bạn Yêu Thích",
    });
  };

  const renderFavoriteList = useMemo(() => {
    if (!favoriteList.data) return null;

    return favoriteList.data.map((item) => (
      <Col key={item.id} lg={6} md={6} sm={8} xs={12}>
        <Card
          size="small"
          cover={<img alt="example" src={item.product.image} />}
          actions={[
            <Space onClick={() => handleUnFavoriteProduct(item.id)}>
              <DeleteOutlined />
              <span>Xóa</span>
            </Space>,
          ]}
        >
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.product.id })}>
            <S.ProductTitle truncateMultiLine={2}>{item.product.name}</S.ProductTitle>
          </Link>
          <S.ProductPrice>{item.product.price.toLocaleString()} VND</S.ProductPrice>
        </Card>
      </Col>
    ));
  }, [favoriteList.data]);

  return (
    <Spin spinning={favoriteList.loading}>
      {!favoriteList.data || !favoriteList.data.length ? (
        <p>Chưa có sản phẩm yêu thích</p>
      ) : (
        <Row gutter={[16, 16]}>{renderFavoriteList}</Row>
      )}
    </Spin>
  );
}

export default FavoriteProducts;
