<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">商品目录: </span>
                <span class="expand-value">{{ row.categoryType }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">国家: </span>
                <span class="expand-value">{{ row.country }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">商品数量: </span>
                <span class="expand-value">{{ row.quantity }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">变种属性: </span>
                <span class="expand-value">{{ row.VariType }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">子变种类型: </span>
                <span class="expand-value">{{ row.childAttr.length }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>