import { PartialType } from "@nestjs/swagger"

export class <%=classify(name)%>CreateDto {

}

export class <%=classify(name)%>UpdateDto extends PartialType(<%=classify(name)%>CreateDto) {}