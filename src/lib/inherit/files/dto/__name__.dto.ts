import { <%= classify(inheritName) %>Dto } from '<%= inheritPath %>/dto/abstract.dto';
export class <%= classify(name) %>Dto extends <%=classify(inheritName)%>Dto {
  // Add properties here
}
